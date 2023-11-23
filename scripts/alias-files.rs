//! ```cargo
//! [dependencies]
//! clap = { version = "4.2", features = ["derive"] }
//! serde = { version = "*", features = ["derive"] }
//! serde_json = "1.0"
//! anyhow = "*"
//! html2md = "*"
//! regex = "*"
//! slug = "0.1.4"
//! url = "*"
//! ```

use clap::Parser;

use anyhow::{bail, Result};
use html2md::parse_html;
use regex::{Captures, Regex};
use serde::Deserialize;
use std::collections::HashMap;
use std::error::Error;
use std::fs::{read_dir, remove_file, File, ReadDir};
use std::io::{BufReader, Read, Write};
use std::ops::Index;
use std::path::PathBuf;
use std::str::FromStr;

#[derive(Parser, Debug)]
#[clap(version)]
struct Args {
    #[clap(short, long, help = "Path to folder")]
    config: Option<std::path::PathBuf>,
}

fn main() -> anyhow::Result<()> {
    let args = Args::parse();
    println!("{:?}", args);
    let path = args.config.unwrap();

    let capital_detection = Regex::new(r"([a-z])([A-Z])").unwrap();
    let name_regex = Regex::new(r"\[\[(?<path>[^|\]]+)(?<alias>\|[^\]]+)?\]\]").unwrap();
    let name_regex_2 = Regex::new(r"\[(?<alias>[^)\]]+?)\]\((?<path>[^:)]+\))").unwrap();

    let dir = read_dir(path.clone())?;

    process_directory(dir, &capital_detection, &name_regex, &name_regex_2)?;

    // let test = process_file_content(
    //     &name_regex,
    //     &name_regex_2,
    //     &capital_detection,
    //     r#"According to [[Tiago Forte]] - Hemingway would only end a writing session when he knew what came next in the story, but without starting work on it.
    // This allowed him to jump right in the next day. It's a similar concept to [[Dave Farley]]'s idea of [[ending on a failing test]].

    // For [[PARA Project|Projects]] the idea is to add a note detailing what I just did & next steps at the end of each week, so that I can jump back into the project easily next time I tackle it.

    // ## Connections
    // ### North - Where X Comes from
    // [[How I Plan My Weekly Tasks  PARA Method - Part 3]]
    // [Last Link](CRDT)
    // [But Not](www.google.com)

    // ### South - Were X Leads

    // ### East - Opposes or Challenges X

    // ### West - Similar to or Reinforces X"#,
    //     "Some File Name",
    // );
    // println!("{test}");

    Ok(())
}

fn process_directory(
    dir: ReadDir,
    capital_detection: &Regex,
    name_regex: &Regex,
    name_regex_2: &Regex,
) -> anyhow::Result<()> {
    for entry in dir {
        let Ok(entry) = entry else {
            continue;
        };
        let path = entry.path().clone();
        let Ok(file_type) = entry.file_type() else {
            continue;
        };
        if file_type.is_dir() {
            if path.to_string_lossy().contains("z_system") {
                continue;
            }
            let Ok(dir) = read_dir(path) else {
                continue;
            };
            let _ = process_directory(dir, capital_detection, name_regex, name_regex_2);
        } else if file_type.is_file() && path.extension().is_some_and(|v| v == "md") {
            let _ = process_file(path, capital_detection, name_regex, name_regex_2);
        }
    }
    Ok(())
}

fn process_file(
    mut path: PathBuf,
    capital_detection: &Regex,
    name_regex: &Regex,
    name_regex_2: &Regex,
) -> anyhow::Result<()> {
    let Some(original) = path.file_stem() else {
        bail!("No file name")
    };
    let content = {
        let mut file = File::open(&path)?;
        let mut content = String::new();
        file.read_to_string(&mut content);
        content
    };

    let _ = remove_file(&path);

    let content = process_file_content(
        name_regex,
        name_regex_2,
        capital_detection,
        &content,
        &original.to_string_lossy().to_string(),
    );

    let slug = name_to_slug(capital_detection, &original.to_string_lossy().to_string());
    println!("From {path:?}");

    path.set_file_name(format!("{slug}.md"));

    println!("To {path:?}");

    let mut file = File::create(path)?;
    file.write(content.as_bytes())?;

    Ok(())
}

fn name_to_slug(capital_detection: &Regex, original: impl Into<String>) -> String {
    let string: String = original.into();
    let spaced = capital_detection.replace_all(&string, "$1 $2").to_string();

    let slug = slug::slugify(spaced);
    slug
}

fn process_file_content(
    name_regex: &Regex,
    name_regex_2: &Regex,
    capital_detection: &Regex,
    original: &str,
    old_name: &str,
) -> String {
    let result = name_regex
        .replace_all(original, |c: &Captures| -> String {
            replacer(c, capital_detection)
        })
        .to_string();
    let result = name_regex_2
        .replace_all(&result, |c: &Captures| -> String {
            replacer(c, capital_detection)
        })
        .to_string();

    let aliases = format!(
        r#"---
aliases: {old_name}"#
    );

    if result.starts_with("---") {
        result.replacen("---", &format!("{aliases}"), 1)
    } else {
        format!(
            r#"{aliases}
---
{result}"#
        )
    }
}

fn replacer(c: &Captures, capital_detection: &Regex) -> String {
    let Option::<&str>::Some(path_src) = c.name("path").map(|c| c.as_str()) else {
        return format!("{}", c.index(0));
    };
    {
        if let Ok(url) = url::Url::parse(path_src) {
            if !url.cannot_be_a_base() {
                return format!("{}", c.index(0));
            }
        }
    }

    let Ok(mut path) = PathBuf::from_str(path_src) else {
        return format!("{}", c.index(0));
    };
    let ext = if let Some(ext) = path.extension() {
        ext.to_string_lossy().to_string()
    } else {
        "md".to_string()
    };
    if ext != "md" {
        return format!("{}", c.index(0));
    }
    let Some(name) = path.file_stem() else {
        return format!("{}", c.index(0));
    };

    let name = name_to_slug(capital_detection, name.to_string_lossy());
    path.set_file_name(format!("{name}.md"));

    let path = path.to_string_lossy().to_string().replace("\\", "/");

    let alias = c.name("alias").map_or(path_src, |c| c.as_str());

    format!("[[{path}|{alias}]]")
}

// fn process_document(
//     _: &str,
//     document: &Document,
//     map: &HashMap<String, (String, Resource)>,
//     regex: &Regex,
// ) -> String {
//     let content = regex
//         .replace_all(&document.content, |c: &regex::Captures| -> String {
//             format!("href=\"./{}", replacer(c, map))
//         })
//         .to_string();

//     let content = parse_html(&content);

//     content
// }

// fn replacer(c: &regex::Captures, map: &HashMap<String, (String, Resource)>) -> String {
//     let id: &str = c.name("id").map_or("", |m| m.as_str());
//     if let Some(f) = map.get(id) {
//         f.0.clone()
//     } else {
//         "*****".to_string()
//     }
// }
