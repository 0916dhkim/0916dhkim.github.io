import { mapHandler, postSchema, withUser } from "@0916dhkim/core";

import { prisma } from "@0916dhkim/prisma";

const updatePostSchema = postSchema.omit({
  id: true,
});

export default mapHandler({
  PUT: withUser(async (req, res) => {
    const postId = req.query.id;
    if (typeof postId !== "string") {
      return res.status(400).json({
        message: "Missing post ID.",
      });
    }
    const parsed = updatePostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.message,
      });
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: parsed.data,
    });

    return res.json({ post });
  }),
});
