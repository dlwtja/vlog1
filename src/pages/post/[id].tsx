import Post from "../../../components/Post";
import { postApis } from "../../core/apis/posts";
import { NextSeo } from "next-seo";

import type { GetStaticPaths, GetStaticProps } from "next";
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
    const res = await fetch(`http://localhost:3001/api/post?id=${id}`);
    const data = await res.json();

    return {
      props: {
        data,
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

const postlist3: React.FC<IPostPageProps> = ({ id, data }: IPostPageProps) => {
  return (
    <>
      <Post data={data} id={id} />
    </>
  );
};
export default postlist3;
