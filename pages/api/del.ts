// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sqlite3 = require("sqlite3").verbose();
import type { NextApiRequest, NextApiResponse } from "next";

let db = new sqlite3.Database("sample.db");

type Data = {
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let sql = `DELETE FROM users`;
  let arr: any = [];

  try {
    db.run(sql, [], function (err: any) {
      if (err) res.status(500).end();
      res.status(200).json({ success: true });
    });
  } catch (error) {
    res.status(500).end();
  }

  // close the database connection
}
