import serverClient from "@/utils/clients/serverClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await serverClient.get(
      `/markets/fetch/${req?.query?.questionId}`
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
