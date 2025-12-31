import { z, defineCollection } from "astro:content";

const storytelling_timeline = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      image: image().optional(),
      image_alt: z.string().optional(),
      dialogue_bg: z.string().optional(),
      date: z.date(),
      tags: z.string(),
      links: z.optional(z.record(z.string())),
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
      z.object({
        project: z.string(),
        open_source_used: z.boolean().optional(),
      }),
    ]),
    summary: z.string(),
    end_date: z.optional(z.date()),
    start_date: z.date(),
    tags: z.union([
      z.string(),
      z.record(
        z.union([
          z.object({
            priority: z.optional(z.number()),
            text: z.string(),
          }),
          z.string(),
        ]),
      ),
    ]),
    links: z.optional(z.record(z.string())),
    resume_details: z.record(z.string()).optional(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.union([
      z.string(),
      z.record(
        z.union([
          z.object({
            priority: z.optional(z.number()),
            text: z.string(),
          }),
          z.string(),
        ]),
      ),
    ]),
    date: z.date(),
    summary: z.string(),
    type: z.enum(["computing", "storytelling", "both"]),
  }),
});

const printed = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.enum(["computing", "storytelling"]),
  }),
});

const interactiveAudio = defineCollection({
  type: "content",
  schema: z.object({
    directory: z.string(),
    bpm: z.number(),
    timeSignature: z.string(),
    startSection: z.string(),
    variables: z.array(z.string()),
    sections: z.map(z.string(), z.object({
      label: z.string().optional(),
      filePrefix: z.string(),
      enterOn: z.enum(["bar", "beat"]),
      after: z.discriminatedUnion("type", [
        z.object({type: z.literal("loop")}),
        z.object({type: z.literal("next"), next: z.array(z.string())})
      ]),
      tracks: z.map(z.string(), z.object({
        label: z.string().optional(),
        volume: z.union([z.number(), z.object({variable: z.string(), volumes: z.array(z.object({value: z.number(), volume: z.number()}))})]),
        clips: z.union([z.string(), z.object({variable: z.string(), clips: z.array(z.object({value: z.number(), clip: z.string()}))})])
      }))
    }))
  })
})

export const collections = {
  "storytelling-timeline": storytelling_timeline,
  "computing-timeline": computing_timeline,
  blog: blog,
  printed: printed,
  "interactive-audio": interactiveAudio
};
