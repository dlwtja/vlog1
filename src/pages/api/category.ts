import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

import type { IAPIError, Response } from "../../interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<SelectPropertyResponse[]> | IAPIError>
) {
  const database_id = publicRuntimeConfig.DATABASE_ID;
  const auth = publicRuntimeConfig.NOTION_KEY;

  if (!auth || !database_id) {
    res.status(401).json({ message: "인증 실패" });
    return;
  }

  const notion = new Client({
    auth,
  });

  (async () => {
    try {
      if (req.method === "GET") {
        const response = await notion.databases.retrieve({
          database_id,
        });

        const data = (
          response.properties
            .categories as MultiSelectDatabasePropertyConfigResponse
        ).multi_select.options;

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
      res.status(status).json(JSON.parse(body));
    }
  })();
}
