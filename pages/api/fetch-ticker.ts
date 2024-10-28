import serverClient from "@/utils/clients/serverClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await serverClient.get(
      `/markets/tickers/${req.body.questionId}/${req.body.outcomeIndex}`
    );
    return res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
