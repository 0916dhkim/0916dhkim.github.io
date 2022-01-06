import * as z from "zod";

import { mapHandler, withUser } from "@0916dhkim/core";

import { PrismaClient } from "@0916dhkim/prisma";

const createDraftSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default mapHandler({
  GET: withUser(async (req, res) => {
    const prisma = new PrismaClient();
    const drafts = await prisma.draft.findMany({
      include: {
        versions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    return res.json({ drafts });
  }),
  POST: withUser(async (req, res) => {
    const prisma = new PrismaClient();
    const parsed = createDraftSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.message,
      });
    }
    const { draft } = await prisma.draftVersion.create({
      data: {
        content: parsed.data.content,
        draft: {
          create: {
            title: parsed.data.title,
          },
        },
      },
      select: {
        draft: true,
      },
    });

    return res.json({ draft });
  }),
});
