//! ```cargo
//! [dependencies]
//! clap = { version = "4.2", features = ["derive"] }
//! serde = { version = "*", features = ["derive"] }
//! serde_json = "1.0"
//! anyhow = "*"
//! html2md = "*"
//! regex = "*"
//! ```

use clap::Parser;

use anyhow::Result;
use html2md::parse_html;
use regex::Regex;
use serde::Deserialize;
use std::collections::HashMap;
use std::error::Error;
use std::fs::{create_dir, File};
use std::io::BufReader;
use std::path::PathBuf;

#[derive(Parser, Debug)]
#[clap(version)]
struct Args {
    #[clap(short, long, help = "Path to config")]
    config: Option<std::path::PathBuf>,
}

#[derive(Deserialize, Debug)]
struct Project {
    resources: Vec<Resource>,
}

#[derive(Deserialize, Debug)]
struct Resource {
    id: String,
    name: String,
    parentId: Option<String>,
    tags: Vec<String>,
    documents: Vec<Document>,
}

#[derive(Deserialize, Debug)]
struct Document {
    id: String,
    name: String,
    content: String,
}

fn main() -> anyhow::Result<()> {
    let args = Args::parse();
    println!("{:?}", args);
    let path = args.config.unwrap();
    let file = File::open::<PathBuf>(path.clone())?;
    let reader = BufReader::new(file);

    // Read the JSON contents of the file as an instance of `User`.
    let p: Project = serde_json::from_reader(reader)?;

    println!("Loaded {} Resources", p.resources.len());

    let map: HashMap<String, (String, Resource)> = p
        .resources
        .into_iter()
        .map(|r| (r.id.clone(), (format!("{}.md", &r.name), r)))
        .collect();

    print!(
        "File Names: \n{:?}",
        map.iter()
            .map(|(_, v)| v.0.clone())
            .collect::<Vec<_>>()
            .join(" \n ")
    );

    let regex = Regex::new(r"href=.(?P<x>([a-z0-9:/.]+/)*)(?P<id>[a-z0-9]+)(?P<y>.html)?")?;

    let mut path = path.clone();
    path.pop();
    path.push("output");

    create_dir(path.clone());

    for (_, (name, resource)) in map.iter() {
        let result = process_resource(resource, &map, &regex);
        let mut path = path.clone();
        path.push(name);
        std::fs::write(path, result);
    }
    Ok(())
}

fn process_resource(
    resource: &Resource,
    map: &HashMap<String, (String, Resource)>,
    regex: &Regex,
) -> String {
    let result = resource
        .documents
        .iter()
        .map(|document| {
            format!(
                "# {}\n{}",
                &document.name,
                process_document(&resource.name, document, map, regex)
            )
        })
        .collect::<Vec<_>>()
        .join("\n\n");

    let Some(parent) = resource.parentId.clone() else {
        return result;
    };

    let Some((parent_name, parent_resource)) = map.get(&parent) else {
        return result;
    };

    return format!(
        "[{}](./{})\n\n{}",
        parent_resource.name, parent_name, result
    );
}

fn process_document(
    _: &str,
    document: &Document,
    map: &HashMap<String, (String, Resource)>,
    regex: &Regex,
) -> String {
    let content = regex
        .replace_all(&document.content, |c: &regex::Captures| -> String {
            format!("href=\"./{}", replacer(c, map))
        })
        .to_string();

    let content = parse_html(&content);

    content
}

fn replacer(c: &regex::Captures, map: &HashMap<String, (String, Resource)>) -> String {
    let id: &str = c.name("id").map_or("", |m| m.as_str());
    if let Some(f) = map.get(id) {
        f.0.clone()
    } else {
        "*****".to_string()
    }
}
