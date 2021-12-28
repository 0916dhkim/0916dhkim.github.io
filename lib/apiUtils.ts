import { NextApiHandler } from "next";

export function buildHandler(
  handlers: Record<string, NextApiHandler>
): NextApiHandler {
  return async (req, res) => {
    const { method } = req;
    if (method === undefined) {
      return res.status(400).send("Missing request method.");
    }
    const handler = handlers[method];
    if (handler === undefined) {
      return res.status(405).send(`Method ${method} not allowed.`);
    }

    return handler(req, res);
  };
}
