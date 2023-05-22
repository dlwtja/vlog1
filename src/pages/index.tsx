import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { postApis } from "../core/apis/posts";
import PostList from "../../components/PostList";
import Homes from "../../components/Home";
import { GetStaticProps } from "next";
const inter = Inter({ subsets: ["latin"] });
export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await postApis.getPosts();
    return { props: { data: res }, revalidate: 3600 };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

const Home = ({ data }: any) => {
  // console.log(data.data.properties);
  return (
    <>
      <Homes initialPosts={data} />;{/* <PostList data={data} /> */}
    </>
  );
};

export default Home;
