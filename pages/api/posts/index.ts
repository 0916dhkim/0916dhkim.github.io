import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { supabase } from "lib/supabase";

const postsHandler: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  if (!(await supabase.auth.api.getUser(token))) {
    return res.status(401).send("Unauthorized");
  }

  switch (req.method) {
    case "GET": {
      res.send({
        posts: await prisma.post.findMany(),
      });
      break;
    }
    case "POST": {
      const post = await prisma.post.create({
        data: req.body,
      });

      res.send({ post });
      break;
    }
    default:
      res.status(405).send(`Method ${req.method} not allowed.`);
      break;
  }
};

export default postsHandler;
