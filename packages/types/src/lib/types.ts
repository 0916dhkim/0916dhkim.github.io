import * as z from "zod";

export const languageSchema = z.union([z.literal("EN"), z.literal("KR")]);

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  language: languageSchema,
  summary: z.string().nullish(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Date properties are converted to numbers
// when a draft is converted to JSON format.
export const postJsonSchema = postSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .and(
    z.object({
      createdAt: z.number(),
      updatedAt: z.number(),
    })
  );

export const draftSchema = z.object({
  id: z.string(),
  title: z.string(),
  language: languageSchema,
  summary: z.string().nullish(),
  content: z.string(),
});

export const draftJsonSchema = draftSchema;
