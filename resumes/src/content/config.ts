
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

export const collections = {
    'storytelling-timeline': storytelling_timeline
};