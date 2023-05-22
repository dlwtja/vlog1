import Link from "next/link";
import { memo, Suspense } from "react";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Response } from "../../src/interfaces";
import { NextSeo } from "next-seo";
import * as PostCard from "../PostCard";
import CustomSuspense from "../CustomSuspense";
import { useCallback, useState } from "react";
import TextFilter from "../TextFilter";
import CategoryFilter from "../CategoryFilter";
import { QueryErrorResetBoundary } from "react-query";
import useMounted from "../../src/core/hooks/useMounted";
import { useGetPosts } from "../../src/core/queries/posts";
interface PostListProps {
  className?: string;
  id?: string;
  data?: Response<PageObjectResponse[]>;
  initialPosts?: Response<PageObjectResponse[]>;
  selectedCategory?: string[];
  enteredText?: string;
}
interface IPostsProps {
  className?: string;
  initialPosts?: Response<PageObjectResponse[]>;
  selectedCategory: string[];
  enteredText: string;
  data?: Response<PageObjectResponse[]>;
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
const Posts: React.FC<IPostsProps> = ({
  className,
  initialPosts,
  selectedCategory,
  enteredText,
  data,
}) => {
  return (
    <div className={`posts-wrapper ${className}`}>
      <QueryErrorResetBoundary>
        <CustomSuspense
          fallback={
            <ul>
              <li>
                <PostCard.Skeleton />
              </li>
              <li>
                <PostCard.Skeleton />
              </li>
              <li>
                <PostCard.Skeleton />
              </li>
            </ul>
          }
        >
          <PostList
            initialPosts={initialPosts}
            selectedCategory={selectedCategory}
            enteredText={enteredText}
          />
        </CustomSuspense>
      </QueryErrorResetBoundary>
    </div>
  );
};

const PostList: React.FC<PostListProps> = ({
  initialPosts,
  selectedCategory,
  enteredText,
}: PostListProps) => {
  const mounted = useMounted();
  const { data } = useGetPosts(
    {
      filter: JSON.stringify({
        categories: selectedCategory,
        query: enteredText,
      }),
    },
    {
      suspense: true,
      useErrorBoundary: true,
      initialData: !mounted ? initialPosts : undefined,
    }
  );

  return (
    <ul>
      {data?.data.map((post) => (
        <li key={post.id}>
          <PostCard.Contents data={data} />
        </li>
      ))}
    </ul>
  );
};
export default memo(PostList);
