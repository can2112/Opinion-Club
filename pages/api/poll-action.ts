import serverClient from "@/utils/clients/serverClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await serverClient.post(
      `/markets/approvals/${req.body.questionId}`,
      {
        status: req?.body?.status,
        user: req?.body?.user,
      }
    );

    return res
      .status(response.status)
      .send({ ...response.data, status: req.body.status });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
