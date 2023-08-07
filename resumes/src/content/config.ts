
import { z, defineCollection } from "astro:content";

const storytelling_timeline = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        image: z.string().optional(),
        image_alt: z.string().optional(),
        date: z.date(),
        tags: z.string()
    }),
});

const computing_timeline = defineCollection({
    type: "content",
    schema: z.object({
        info: z.union([z.object({
            company: z.string(),
            role: z.string(),
        }), z.object({ project: z.string() })]),
        summary: z.string(),
        end_date: z.optional(z.date()),
        start_date: z.date(),
        tags: z.string()
    }),
});

export const collections = {
    'storytelling-timeline': storytelling_timeline,
    'computing-timeline': computing_timeline
};