import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const url = `${process.env.NEXT_PUBLIC_MARKET}/markets/balance/${req.body.questionId}/${req.body.address}`;
      const response = await axios.get(url);
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
}
