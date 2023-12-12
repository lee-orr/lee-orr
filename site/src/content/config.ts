import { z, defineCollection } from "astro:content";

const storytelling_timeline = defineCollection({
  type: "content",
  schema: ({image}) => z.object({
    title: z.string(),
    summary: z.string(),
    image: image().optional(),
    image_alt: z.string().optional(),
    dialogue_bg: z.string().optional(),
    date: z.date(),
    tags: z.string(),
    links: z.optional(z.record(z.string()))
  }),
});

const computing_timeline = defineCollection({
  type: "content",
  schema: z.object({
    info: z.union([
      z.object({
        company: z.string(),
        role: z.string(),
        is_contract: z.boolean().optional(),
      }),
      z.object({ project: z.string() }),
    ]),
    summary: z.string(),
    end_date: z.optional(z.date()),
    start_date: z.date(),
    tags: z.string(),
    links: z.optional(z.record(z.string()))
  }),
});

export const collections = {
  "storytelling-timeline": storytelling_timeline,
  "computing-timeline": computing_timeline,
};
