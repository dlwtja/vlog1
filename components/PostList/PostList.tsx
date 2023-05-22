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

export default memo(Posts);

const PostList: React.FC<PostListProps> = ({
  className,
  id,
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
  console.log(data);
  return (
    <div>
      {data?.data.map((data: any) => (
        <PostCard.Contents data={data} />
      ))}
    </div>
  );
};
