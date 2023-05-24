import Post from "../../../components/Post";
import { postApis } from "../../core/apis/posts";
import type { ExtendedRecordMap } from "notion-types";
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Response } from "../../interfaces";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

interface IPostPageProps {
  id: string;
  data: Response<{
    notionPage: ExtendedRecordMap;
    post: PageObjectResponse;
  }>;
}
export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  console.log(id);
  try {
    const res = await postApis.getPost(id);
    return {
      props: {
        data: res,
        id,
        revalidate: 3600,
        fallback: true,
      },
    };
  } catch (e) {
    return {
      props: {
        data: null,
        revalidate: 3600,
      },
    };
  }
};

export default function ({ id, data }: IPostPageProps) {
  const cover = data?.data.post.cover as {
    type: "external";
    external: {
      url: TextRequest;
    };
  };

  const title = data?.data.post.properties.title as {
    type: "title";
    title: Array<RichTextItemResponse>;
    id: string;
  };

  const subTitle = data?.data.post.properties.subTitle as {
    type: "rich_text";
    rich_text: Array<RichTextItemResponse>;
    id: string;
  };
  console.log(data);
  return (
    <>
      <Post data={data} id={id} />
    </>
  );
}
