import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

import PostList from "../../components/PostList";
import Homes from "../../components/Home";
const inter = Inter({ subsets: ["latin"] });
export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/posts");
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}

const Home = ({ data }: any) => {
  // console.log(data.data.properties);
  return (
    <>
      <Homes initialPosts={data} />;{/* <PostList data={data} /> */}
    </>
  );
};

export default Home;
