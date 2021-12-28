import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { buildHandler } from "lib/apiUtils";
import { supabase } from "lib/supabase";

const postsHandler: NextApiHandler = buildHandler({
  GET: async (req, res) => {
    const prisma = new PrismaClient();
    const token = req.headers.authorization?.replace(/^Bearer /, "");
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    if (!(await supabase.auth.api.getUser(token))) {
      return res.status(401).send("Unauthorized");
    }

    res.send({
      posts: await prisma.post.findMany(),
    });
  },
  POST: async (req, res) => {
    const prisma = new PrismaClient();
    const token = req.headers.authorization?.replace(/^Bearer /, "");
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    if (!(await supabase.auth.api.getUser(token))) {
      return res.status(401).send("Unauthorized");
    }

    const post = await prisma.post.create({
      data: req.body,
    });

    res.send({ post });
  },
});

export default postsHandler;
