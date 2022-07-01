import { CenterCol, PageWrapper } from "../..";
import { useEffect, useState } from "react";

import { BlogPost } from "../../api/get-single-post";
import type { NextPage } from "next";
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

  const dt = new Date(post.published);

  const date = `${dt.getDate()} ${dt.toLocaleString([], {
    month: "short",
  })} ${dt.getFullYear()}`;

  const time = `${dt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const pubDate = `${date}, ${time}`;

  return (
    <PageWrapper>
      <CenterCol>
        <h1>{post.title}</h1>
        <span>Published: {pubDate}</span>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </CenterCol>
    </PageWrapper>
  );
};

export default BlogPostPage;
