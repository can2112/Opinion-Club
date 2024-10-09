import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const url = `${process.env.NEXT_PUBLIC_MARKET}/markets/status/${req.body.questionId}/${req.body.txnHash}`;
    console.log(url, "url->");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_MARKET}/markets/status/${req.body.questionId}/${req.body.txnHash}`,
      req.body
    );

    return res.status(response.status).send(response.data);
  }
}
