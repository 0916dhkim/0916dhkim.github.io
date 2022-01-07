import * as z from "zod";

import { Draft, prisma } from "@0916dhkim/prisma";
import { mapHandler, withUser } from "@0916dhkim/core";

const updateDraftSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export default mapHandler({
  GET: withUser(async (req, res) => {
    const draftId = req.query.id;
    if (typeof draftId !== "string") {
      return res.status(400).json({
        message: "Missing draft ID.",
      });
    }
    const draft = await prisma.draft.findUnique({
      where: { id: draftId },
      include: {
        versions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (draft === null) {
      return res.status(404).json({
        message: "Not found.",
      });
    }
    res.json({ draft });
  }),
  POST: withUser(async (req, res) => {
    const draftId = req.query.id;
    if (typeof draftId !== "string") {
      return res.status(400).json({
        message: "Missing draft ID.",
      });
    }
    const parsed = updateDraftSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.message,
      });
    }
    const { content, title } = parsed.data;
    let draft: Draft | undefined = undefined;
    if (title) {
      draft = await prisma.draft.update({
        where: { id: draftId },
        data: { title },
      });
    }
    if (content) {
      draft = (
        await prisma.draftVersion.create({
          data: {
            content,
            draft: {
              connect: {
                id: draftId,
              },
            },
          },
          select: { draft: true },
        })
      ).draft;
    }

    return res.json({ draft });
  }),
});
