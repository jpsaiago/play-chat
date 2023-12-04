import { sha3_256 } from "js-sha3";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  hash: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const hash = sha3_256(req.body.input);
    res.status(201).send({ hash });
  }
}
