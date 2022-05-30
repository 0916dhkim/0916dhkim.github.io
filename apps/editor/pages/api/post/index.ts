import * as z from "zod";

import { mapHandler, withUser } from "@blog-monorepo/api-helpers";

import { prisma } from "@blog-monorepo/prisma";

const createPostSchema = z.object({
  draftId: z.string(),
});

export default mapHandler({
  POST: withUser(async (req, res) => {
    const parsed = createPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.message,
      });
    }
    const draft = await prisma.draft.findUnique({
      where: { id: parsed.data.draftId },
      include: {
        versions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            content: true,
          },
        },
      },
    });
    if (draft === null) {
      return res.status(404).json({
        message: "Draft not found.",
      });
    }
    const latestDraftVersion = draft.versions[0];
    if (latestDraftVersion === undefined) {
      return res.status(500).json({
        message: "Draft does not have any version.",
      });
    }

    const post = await prisma.post.create({
      data: {
        content: latestDraftVersion.content,
        language: draft.language,
        title: draft.title,
        summary: draft.summary,
      },
    });

    // Delete all drafts when post is created successfully.
    await prisma.$transaction([
      prisma.draftVersion.deleteMany({
        where: { draftId: parsed.data.draftId },
      }),
      prisma.draft.delete({ where: { id: parsed.data.draftId } }),
    ]);

    return res.json({ post });
  }),
});
