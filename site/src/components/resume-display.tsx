import { PDFDocument, PDFFont, PDFPage, PageSizes, StandardFontEmbedder, StandardFontValues, StandardFonts, TextAlignment, layoutMultilineText, layoutSinglelineText } from "pdf-lib";
import { createEffect, createSignal } from "solid-js";
import qs from "qs";

import styles from "./resume-display.module.css";
import { style } from "solid-js/web";
import { defineStyleVars } from "astro/compiler-runtime";

interface BaseResumeInfo { title: string, name: string, contacts: Array<{ type: string, value: string, icon: string }>, resume_info: Array<{slug: string, title: string, type: string, summary: string, start_date: Date, end_date?: Date, resume_details?: Record<string, string>}>, tags: Record<string, number>, education: Array<{ institution: string, certificate: string }> }

export interface Details { targetAI?: boolean, jobs: Record<string, { full: boolean, details: string[]}>, skills: Record<string, boolean> }

export default function ResumeDisplay(base_info: BaseResumeInfo) {
    let details = qs.parse(window.location.search.replace('?', ''), {  });

    let job_filters : Record< string, { full: boolean, details: string[] }> = {};

    let skill_filters : Record<string, boolean> = {};
    
    if ('jobs' in details && typeof details.jobs === 'object' && !Array.isArray(details.jobs)) {
        for (const key of Object.keys(details.jobs)) {
            const value = details.jobs[key];

            if (typeof value === 'object' && !Array.isArray(value)) {
                job_filters[key] = {
                    full: value.full === "true",
                    details: Array.isArray(value.details) ? value.details.map((v) => v.toString()) : []
                };
            }
        }
    }

    if ('skills' in details && typeof details.skills === 'object' && !Array.isArray(details.skills)) {
        for (const skill of Object.keys(details.skills)) {
            skill_filters[skill] = details.skills[skill] === "true";
        }
    }

    let jobs = base_info.resume_info.filter(({slug}) => { return job_filters[slug] !== undefined }).map((v) => {
        let listing = job_filters[v.slug];
        let resume_details = [];
        if (v.resume_details) {
            for (const key of listing.details) {
                resume_details.push(v.resume_details[key])
            }
        }
        return {...v, full: listing.full, resume_details }
    });

    if (details.targetAI === 'true') {
        return <>
            <div class={styles.aiTarget}>
                <div class={styles.header}>
                    <h1>{base_info.name}</h1>
                    <h2>{base_info.title}</h2>
                    <h3>Contact Info</h3>
                    <div>{
                        base_info.contacts.map(({ type, value, icon }) => {
                            return <p><strong>{type}:</strong> {value}</p>
                        })
                    }
                    </div>
                </div>
                <h3>Jobs</h3>
                <ul class={styles.jobs}>
                    {jobs.map(({slug, title, type, summary, start_date, end_date, resume_details, full}) => {
                        return <li>
                            <h4>{title}</h4>
                            <h5>{start_date.getMonth() + 1}/{start_date.getFullYear()} { end_date ? ` to ${end_date.getMonth() + 1}/${end_date.getFullYear()}`: ''}</h5>
                            { full ?
                            <div>{summary}</div>
                            : <></>}
                            {resume_details.map(v => <div>{v}</div>)}
                        </li>
                    })}
                </ul>
                <h3>Education</h3>
                <ul class={styles.jobs}>
                    {base_info.education.map(({institution, certificate}) => <li><h4>{certificate}</h4><h5>{institution}</h5></li>)}
                </ul>
                <h3>Skills</h3>
                <div class={styles.footer}>
                    <ul class={styles.skills}>{Object.keys(base_info.tags).filter((v) => skill_filters[v]).map((v) => <li>{v}</li>)}</ul>
                </div>
            </div>
        </>
    }


    return <><div class={styles.wrapper}>
        <div class={styles.header}>
            <h1>{base_info.name}</h1>
            <h2>{base_info.title}</h2>
            <h3>{
                base_info.contacts.map(({ type, value, icon }) => {
                    return <span><i class={icon} /> {value}</span>
                })
            }</h3>
        </div>
        <div class={styles.jobs_container}>
            <ul class={styles.jobs}>
                {jobs.map(({slug, title, type, summary, start_date, end_date, resume_details, full}) => {
                    return <li>
                        <h4>{title}</h4>
                        <h5>{type} - {start_date.getMonth() + 1}/{start_date.getFullYear()} { end_date ? ` to ${end_date.getMonth() + 1}/${end_date.getFullYear()}`: ''}</h5>
                        { full ?
                        <div>{summary}</div>
                        : <></>}
                        {resume_details.map(v => <div>{v}</div>)}
                    </li>
                })}
                {base_info.education.map(({institution, certificate}) => <li><h4>{certificate}</h4><h5>{institution}</h5></li>)}
            </ul>
        </div>
        <div class={styles.footer}>
            <h3>Skills</h3>
            <ul class={styles.skills}>{Object.keys(base_info.tags).filter((v) => skill_filters[v]).map((v) => <li>{v}</li>)}</ul>
            
        </div>
    </div>
    </>;
}
