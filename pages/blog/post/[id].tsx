import { CenterCol, PageWrapper } from "../.";
// import { ContextType, useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";

import { BlogPost } from "../../../util/types";
import SEO from "../../../components/seo";
import { getDisplayDatetime } from "../../../util";

// import { useRouter } from "next/router";

interface Props {
  post: BlogPost;
}

const BlogPostPage: NextPage<Props> = ({ post }: Props) => {
  // const router = useRouter();

  // const [post, setPost] = useState<BlogPost>();

  // const fetchBlogPosts = async (id: string) => {
  //   const { entry } = await (
  //     await fetch(`/api/get-single-post?id=${id}`)
  //   ).json();

  //   setPost(entry);
  // };

  // useEffect(() => {
  //   const { id } = router.query;

  //   fetchBlogPosts(id as string);
  // }, [router.query]);

  if (!post) {
    return null;
  }

  return (
    <>
      <SEO pageTitle={post.title} description={post.description} />
      <PageWrapper>
        <CenterCol>
          <h1>{post.title}</h1>

          <span>Published: {getDisplayDatetime(post.published)}</span>

          <div dangerouslySetInnerHTML={{ __html: post.content! }} />
        </CenterCol>
      </PageWrapper>
    </>
  );
};

export default BlogPostPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const host = req.headers.host;
  const protocol = req.headers.referer?.split("://")[0];
  const { entry } = await (
    await fetch(`${protocol}://${host}/api/get-single-post?id=${query.id}`)
  ).json();

  return { props: { post: entry } };
};
