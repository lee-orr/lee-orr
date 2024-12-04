import { PDFDocument, PDFFont, PDFPage, PageSizes, StandardFontEmbedder, StandardFontValues, StandardFonts, TextAlignment, layoutMultilineText, layoutSinglelineText } from "pdf-lib";
import { createEffect, createResource, createSignal } from "solid-js";
import qs from "qs";

import styles from "./resume-generator.module.css";
import type { Details } from "./resume-display";

interface ResumeInfo { jobs: Array<{ title: string, id: string, resume_details?: Record<string, string> }>, skills: string[] }

export default function ResumeGenerator(base_info: ResumeInfo) {
    const initial_skills : Record<string, boolean>= {};
    for (const skill of base_info.skills) {
        initial_skills[skill] = true;
    }
    const initial_jobs : Record<string, {full: boolean, details: string[]}>= {};
    for (const job of base_info.jobs) {
        initial_jobs[job.id] = { full: false, details: []};
    }

    const [jobs, set_jobs] = createSignal<Record<string, { full: boolean, details: string[] }>>(initial_jobs);
    const [skills, set_skills] = createSignal<Record<string, boolean>>(initial_skills);
    const [url, set_url] = createSignal<string>("");
    const [targetAi, set_target_ai] = createSignal<boolean>(true);

    createEffect(() => {
        let result = qs.stringify({ jobs: jobs(), skills: skills(), targetAI: targetAi() });
        console.log(result);
        set_url('/computing/resume?' + result)
    })

    const setJobDisplay = (id: string, value: string) => {
        let old_jobs = jobs();
        let new_jobs = { ...old_jobs };
        if (value === "none") {
            delete new_jobs[id];
        } else if (value === "title-only") {
            let listing = new_jobs[id];
            new_jobs[id] = listing ? { full: false, details: listing.details } : { full: false, details: [] }
        } else if (value === "full") {
            let listing = new_jobs[id];
            new_jobs[id] = listing ? { full: true, details: listing.details } : { full: true, details: [] }
        }
        set_jobs(new_jobs);
    };

    return <div class={styles.generator}>
        <div class={styles.options}>
            <div class={''}>
                <label><input type="checkbox" checked={targetAi()} onChange={(e) => {set_target_ai(!targetAi())}}></input> Target AI</label>
            </div>
            <div class={styles.jobs}>
                <span>Hidden</span>
                <span>Full</span>
                <span>Title</span>
                <span>Name</span>
                {base_info.jobs.map(({ title, id, resume_details }) => {
                    let selection = "none";
                    let listing = jobs()[id];
                    if (listing !== undefined) {
                        selection = listing.full ? "full" : "title-only"
                    }
                    let details = listing !== undefined && resume_details !== undefined ? Object.keys(resume_details).map((v) => {
                        let text = resume_details[v];
                        let active = listing.details.includes(v);
                        return <><span></span><span>-</span><input checked={active} type="checkbox" onInput={(e) => {
                            let value = e.target.checked;
                            let old_jobs = jobs();
                            let new_jobs = { ...old_jobs };
                            let new_job = { ...new_jobs[id] };
                            new_job.details = [...new_job.details];
                            if (value) {
                                if (!new_job.details.includes(v)) {
                                    new_job.details.push(v)
                                }
                            } else {
                                if (new_job.details.includes(v)) {
                                    let index = new_job.details.indexOf(v);
                                    new_job.details.splice(index, 1);
                                }
                            }
                            new_jobs[id] = new_job;
                            set_jobs(new_jobs);
                        }}></input> <span>{text}</span></>
                    }) : <></>;

                    return <>
                        <input type="checkbox" checked={selection === "none"} onInput={() => setJobDisplay(id, "none")} />
                        <input type="checkbox" checked={selection === "full"} onInput={() => setJobDisplay(id, "full")} />
                        <input type="checkbox" checked={selection === "title-only"} onInput={() => setJobDisplay(id, "title-only")} />
                        <span>{title}</span>
                        {details}
                    </>
                })}
            </div>

            <div class={styles.skills}>
                {
                    base_info.skills.map((v) => {
                        return <button class={styles.skill} x-selected={skills()[v] === true} onClick={() => {
                            let new_skills = {...skills()};
                            new_skills[v] = new_skills[v] !== true
                            set_skills(new_skills)
                        }}>{v}</button>
                    })
                }
            </div>
        </div>
        <div class={styles.result}>
            <a href={url()}>View Full Page</a>
            <iframe src={url()} class={styles.frame} />
        </div>
    </div>;
}