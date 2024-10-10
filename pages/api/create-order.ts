import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const url = `${process.env.NEXT_PUBLIC_MARKET}/markets/order`;
      const response = await axios.post(url, req.body.body);

      return res.status(response.status).send(response.data);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal server error " });
    }
  }
}
