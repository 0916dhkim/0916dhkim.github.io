import { buildHandler, isAuth } from "lib/apiUtils";

import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

const postsHandler: NextApiHandler = buildHandler({
  GET: async (req, res) => {
    const prisma = new PrismaClient();
    if (!isAuth(req)) {
      return res.status(401).send("Unauthorized");
    }

    res.send({
      posts: await prisma.post.findMany(),
    });
  },
  POST: async (req, res) => {
    const prisma = new PrismaClient();
    if (!isAuth(req)) {
      return res.status(401).send("Unauthorized");
    }

    const post = await prisma.post.create({
      data: req.body,
    });

    res.send({ post });
  },
});

export default postsHandler;
