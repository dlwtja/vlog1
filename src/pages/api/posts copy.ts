import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IAPIError, Response } from "../../interfaces";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const notionKey = publicRuntimeConfig.NOTION_KEY;
import { DEFINED_FILTER } from "./constant";

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
        const { query } = req;
        const filter: QueryDatabaseParameters["filter"] = {
          and: [],
        };

        if (query.filter) {
          const paramsFilter = JSON.parse(query.filter as string);
          if (paramsFilter.categories) {
            paramsFilter.categories.forEach((category: string) => {
              filter.and.push(DEFINED_FILTER.MULTI_SELECT_CATEGORY(category));
            });
          }

          if (paramsFilter.query) {
            const query = paramsFilter.query as string;
            filter.and.push({
              or: [
                DEFINED_FILTER.TITLE_CONTAINED(query),
                DEFINED_FILTER.RICH_TEXT_CONTAINED(query),
              ],
            });
          }
        }
        const response = await notion.databases.query({
          database_id,
          filter,
          sorts: [
            {
              property: "publishDate",
              direction: "descending",
            },
          ],
          page_size: (query.pageSize as number | undefined) || 20,
        });

        const data = response.results as PageObjectResponse[];

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
