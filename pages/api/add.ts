// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sqlite3 = require("sqlite3").verbose();
import type { NextApiRequest, NextApiResponse } from "next";
import { bool } from "prop-types";

let db = new sqlite3.Database("sample.db");

type Data = {
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = req.body.user;
  const password = req.body.pass;

  db.run("CREATE TABLE IF NOT EXISTS users (user TEXT, pass TEXT)");

  db.run(
    `INSERT INTO users(user, pass) VALUES(?, ?)`,
    [username, password],
    function (err: any) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      //console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );

  res.status(200).json({ success: true });
}
