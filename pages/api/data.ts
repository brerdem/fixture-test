// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Excel, { Row } from "exceljs";

var workbook = new Excel.Workbook();

type Data = {
  data: {
    user: string;
    pass: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let arr: any = [];

    await workbook.xlsx.readFile("test.xlsx");

    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow({ includeEmpty: false }, function (row: Row, rowNumber) {
      arr.push({
        user: row.values[1],
        pass: row.values[2],
      });
    });
    res.status(200).json({ data: arr });
  } catch (error) {
    res.status(500).end();
  }

  // close the database connection
}
