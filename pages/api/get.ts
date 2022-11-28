// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sqlite3 = require("sqlite3").verbose();
import type { NextApiRequest, NextApiResponse } from "next";

let db = new sqlite3.Database("sample.db");

type Data = {
  data: {
    user: string;
    pass: string;
  }[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let sql = `SELECT * FROM users`;
  let arr: any = [];

  try {
    db.all(sql, [], (err: any, rows: any) => {
      if (err) {
        res.status(500).end();
      }
      rows.forEach((row: any) => {
        arr.push({ user: row.user, pass: row.pass });
      });
      res.status(200).json({ data: arr });
    });
  } catch (error) {
    res.status(500).end();
  }

  // close the database connection
}
