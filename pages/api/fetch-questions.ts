import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_MARKET}/markets`);

  console.log(response, "response from server->");
  res.status(response.status).send(response.data);
}
