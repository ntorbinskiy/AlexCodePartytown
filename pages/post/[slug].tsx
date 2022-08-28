import {
  getAllPosts,
  getPostBySlug,
  markdownToHtml,
} from "helpers/contentRender";
import type { NextPage } from "next";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BreadCrumbs from "@/components/Post/BreadCrumbs";
import PageProgress from "@/components/Post/PageProgress";
import PostContent from "@/components/Post/PostContent";
import RelatedPosts from "@/components/Post/RelatedPosts";
import StandWithUkraine from "@/components/StandWithUkraine";

import { Post as PostI } from "../index";

export interface PostInterfaceWithContent extends PostI {
  content: string;
}

interface Props {
  post: PostInterfaceWithContent;
}

const Post: NextPage<Props> = ({ post }: Props) => (
  <>
    <Head>
      <title>{post.title}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StandWithUkraine />
    <Header />
    <BreadCrumbs />
    <PageProgress />
    <section className="blogpost-section">
      <div className="container">
        <div className="blogpost-outer">
          <PostContent post={post} />
          <RelatedPosts />
        </div>
      </div>
    </section>
    <Footer />
  </>
);

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "featuredImage",
    "date",
    "draft",
    "tags",
    "content",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post: any) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
