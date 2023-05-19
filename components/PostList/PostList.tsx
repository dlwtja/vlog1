import Link from "next/link";
import Image from "next/image";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Response } from "../../src/interfaces";
import { NextSeo } from "next-seo";
import * as PostCard from "../PostCard";
import { useCallback, useState } from "react";
import TextFilter from "../TextFilter";
import CategoryFilter from "../CategoryFilter";
interface PostListProps {
  className?: string;
  id?: string;
  data: Response<PageObjectResponse[]>;
}
export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  try {
    const res = await fetch(`http://localhost:3001/api/post${id}`);
    const data = await res.json();

    return {
      props: {
        data,
        revalidate: 3600,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        data: null,
        revalidate: 3600,
      },
    };
  }
};

const PostList: React.FC<PostListProps> = ({
  data,
  className,
  id,
}: PostListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [enteredText, setEnteredText] = useState<string>("");
  const handleChangeFilter = useCallback((value: string) => {
    setSelectedCategory((prev) =>
      prev.find((v) => v === value)
        ? prev.filter((v) => v !== value)
        : prev.concat(value)
    );
  }, []);

  const handleSubmitTextFilter = useCallback((value: string) => {
    setEnteredText(value);
  }, []);
  return (
    <div className={`contents ${className}`}>
      <div className="title-wrap">
        <h2>포스트</h2>
        <div className="actions">
          <TextFilter
            onSubmit={handleSubmitTextFilter}
            enteredText={enteredText}
          />
          <CategoryFilter
            onChange={handleChangeFilter}
            value={selectedCategory}
          />
        </div>
      </div>
      <div>
        {data?.data.map((data: any) => (
          <PostCard.Contents data={data} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
