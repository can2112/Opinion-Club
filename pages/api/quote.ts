import serverClient from "@/utils/clients/serverClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const response = await serverClient.post("/markets/quote", req.body);
      res.status(response.status).send(response.data);
    } else {
      res.status(405).send({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
