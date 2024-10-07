import { eventDetail } from "@/utils/questions";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ data: eventDetail });
  // else {
  //   return res.status(404).json({ message: "method not present" });
  // }
}
