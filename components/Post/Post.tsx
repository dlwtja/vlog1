import Link from "next/link";
import Image from "next/image";
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Response } from "../../src/interfaces";
import { NotionRenderer } from "react-notion-x";
import { NextSeo } from "next-seo";
import Comment from "../Comment";
import { useGetPost } from "../../src/core/queries/posts";
import useRootState from "../../src/core/hooks/useRootState";
import type { ExtendedRecordMap } from "notion-types";
import dynamic from "next/dynamic";
import defaultSeoConfig from "../../next-seo.config.js";
import { customMapImageUrl } from "../../src/core/utils/notion-client/customImageMap";
interface IPostPageProps {
  className?: string;
  data: Response<{
    notionPage: ExtendedRecordMap;
    post: PageObjectResponse;
  }>;
  id: string;
}
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const PostList1: React.FC<IPostPageProps> = ({ id, data, className }) => {
  const { mode } = useRootState((state) => state.theme);
  const { data: postData } = useGetPost(id, {
    initialData: data,
  });

  const title = postData?.data.post.properties.title as {
    type: "title";
    title: Array<RichTextItemResponse>;
    id: string;
  };
  const cover = postData?.data.post.cover as {
    type: "external";
    external: {
      url: TextRequest;
    };
  };
  const subTitle = postData?.data.post.properties.subtitle as {
    type: "rich_text";
    rich_text: Array<RichTextItemResponse>;
    id: string;
  };
  const linkMapper = (pageId: string) => `@${pageId}`;
  return (
    <>
      <NextSeo title={title.title[0].plain_text} />
      <div className={`post-wrapper ${className}`}>
        <div className="article-header">
          {cover && (
            <div className="cover-wrap">
              <div className="cover">
                <Image src={cover.external.url} alt="" fill />
              </div>
            </div>
          )}
          {title && (
            <div className="post-title-wrap">
              <h1>{title.title[0].plain_text}</h1>
              {subTitle && <h2>{subTitle.rich_text[0].plain_text}</h2>}
            </div>
          )}
        </div>
        {postData?.data.notionPage && (
          <div className="post-content-wrap">
            <NotionRenderer
              recordMap={postData.data.notionPage}
              darkMode={mode === "dark"}
              components={{ Code, nextLink: Link, nextImage: Image }}
              mapPageUrl={linkMapper}
              mapImageUrl={customMapImageUrl}
            />
          </div>
        )}
        <Comment />
      </div>
    </>
  );
};

export default PostList1;
