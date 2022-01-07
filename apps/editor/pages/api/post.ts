import * as z from "zod";

import { mapHandler, withUser } from "@0916dhkim/core";

import { prisma } from "@0916dhkim/prisma";

const createPostSchema = z.object({
  title: z.string(),
  language: z.union([z.literal("EN"), z.literal("KR")]),
  summary: z.string().optional(),
  content: z.string(),
});

export default mapHandler({
  POST: withUser(async (req, res) => {
    const parsed = createPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.message,
      });
    }
    const post = await prisma.post.create({
      data: parsed.data,
    });

    return res.json({ post });
  }),
});
