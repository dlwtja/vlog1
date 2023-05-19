import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IAPIError, Response } from "../../interfaces";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const notionKey = publicRuntimeConfig.NOTION_KEY;
console.log(notionKey);
import type {
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<PageObjectResponse[]> | IAPIError>
) {
  const database_id = publicRuntimeConfig.DATABASE_ID;
  const auth = publicRuntimeConfig.NOTION_KEY;

  if (!auth || !database_id) {
    res.status(401).json({ message: "인증 실패" });
    return;
  }

  const notion = new Client({ auth: publicRuntimeConfig.NOTION_KEY });

  (async () => {
    try {
      if (req.method === "GET") {
        const response = await notion.databases.query({
          database_id,
        });

        const data = response.results as PageObjectResponse[];
        console.log(data);
        res.status(200).json({
          data,
          status: "ok",
          error: null,
        });
      } else {
        res.status(405).json({});
        return;
      }
    } catch (e) {
      const error = e as any;
      const { status, body } = error;
      if (body) {
        res.status(status).json(JSON.parse(body));
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  })();
}
