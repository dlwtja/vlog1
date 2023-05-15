// /pages/api/post.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ExtendedRecordMap } from "notion-types";
import getConfig from "next/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const NOTION_PAGE_ID = "1cb430fe-1df4-41a8-870a-4605e9d6c546";
  const { publicRuntimeConfig } = getConfig();
  const auth = publicRuntimeConfig.NOTION_KEY;
  const activeUser = "dlwtja@gmail.com";
  const authToken = publicRuntimeConfig.NOTION_KEY;

  if (!auth || !activeUser || !authToken) {
    res.status(401).json({ message: "인증 실패" });
    return;
  }

  const notionRenderClient = new NotionAPI({
    activeUser,
    authToken,
  });

  const notion = new Client({ auth: publicRuntimeConfig.NOTION_KEY });
  (async () => {
    try {
      if (req.method === "GET") {
        const response = (await notion.pages.retrieve({
          page_id: NOTION_PAGE_ID,
        })) as PageObjectResponse;
        //   const notionPage = await notionRenderClient.getPage(NOTION_PAGE_ID);

        const data = {
          //   notionPage,
          post: response,
        };

        res.status(200).json({
          data,
          status: "ok",
          error: null,
        });
      } else {
        res.status(405).json({ message: "Method Not Allowed" });
      }
    } catch (e) {
      const error = e as any;
      const { status, body } = error;
      if (body) {
        res.status(status).json(JSON.parse(body));
      } else {
        console.log(e);
        res.status(500).json({ message: "Server error" });
      }
    }
  })();
};

export default handler;
