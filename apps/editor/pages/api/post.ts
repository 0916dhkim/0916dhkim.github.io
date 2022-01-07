import { mapHandler, postSchema, withUser } from "@0916dhkim/core";

import { prisma } from "@0916dhkim/prisma";

const createPostSchema = postSchema.pick({
  title: true,
  language: true,
  summary: true,
  content: true,
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
