import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { request } from "./";

import type { ExtendedRecordMap } from "notion-types";

export const postApis = {
  getPosts: (params = {}) =>
    request<PageObjectResponse[]>({
      url: "http://localhost:3001/api/posts",
      method: "GET",
      params,
    }),

  getPost: (id: string) =>
    request<{
      notionPage: ExtendedRecordMap;
      post: PageObjectResponse;
    }>({
      url: "http://localhost:3001/api/post",
      method: "GET",
      params: {
        id,
      },
    }),
};
