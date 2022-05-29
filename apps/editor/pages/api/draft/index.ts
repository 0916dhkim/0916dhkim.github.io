import * as z from "zod";

import { mapHandler, withUser } from "@blog-monorepo/api-helpers";

import { languageSchema } from "@blog-monorepo/types";
import { prisma } from "@blog-monorepo/prisma";

const createDraftSchema = z.object({
  title: z.string(),
  language: languageSchema,
  summary: z.string().optional(),
  content: z.string(),
});

export default mapHandler({
  GET: withUser(async (req, res) => {
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
            language: parsed.data.language,
            summary: parsed.data.summary,
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
