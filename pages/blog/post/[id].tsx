import { CenterCol, PageWrapper } from "../..";
import { useEffect, useState } from "react";

import { BlogPost } from "../../../util/types";
import type { NextPage } from "next";
import SEO from "../../../components/seo";
import { getDisplayDatetime } from "../../../util";
import { useRouter } from "next/router";

const BlogPostPage: NextPage = () => {
  const router = useRouter();

  const [post, setPost] = useState<BlogPost>();

  const fetchBlogPosts = async (id: string) => {
    const { entry } = await (
      await fetch(`/api/get-single-post?id=${id}`)
    ).json();

    setPost(entry);
  };

  useEffect(() => {
    const { id } = router.query;

    fetchBlogPosts(id as string);
  }, [router.query]);

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
