import type { GetServerSideProps, NextPage } from "next";
import { getDisplayDatetime, getDomainInfo } from "../../util";
import { useEffect, useState } from "react";

import { BlogPost } from "../../util/types";
import Link from "next/link";
import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
`;

export const CenterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 600px;

  h1 {
    font-size: 3.5rem;
    font-weight: 200;
    letter-spacing: 1px;
  }
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-weight: 300;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 1.2rem;

  h2 {
    font-size: 1.3rem;
    font-weight: 400;
  }
`;

const BlogPageLinks = styled.div`
  display: flex;
  gap: 1rem;
  font-weight: 200;
`;

const skip = 10;

interface Props {
  posts: BlogPost[];
  total: number;
}

const Blog: NextPage<Props> = ({ posts, total }: Props) => {
  const pages = Math.ceil(total / skip);

  return (
    <PageWrapper>
      <CenterCol>
        <h1>Blog</h1>

        <PostsWrapper>
          {!!posts.length &&
            posts.map((post) => (
              <Post key={post.title}>
                <h2>
                  <Link href={`/blog/post/${post.id}`}>
                    <a>{post.title}</a>
                  </Link>
                </h2>
                <span>Published: {getDisplayDatetime(post.published)}</span>
                <p>{post.description}</p>
              </Post>
            ))}
        </PostsWrapper>

        <BlogPageLinks>
          {pages &&
            Array(pages)
              .fill(undefined)
              .map((_, idx) => (
                <Link href={`/blog/${idx}`} key={idx}>
                  <a>{idx + 1}</a>
                </Link>
              ))}
        </BlogPageLinks>
      </CenterCol>
    </PageWrapper>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const [host, protocol] = getDomainInfo(req.headers.host);

  const { entries, total } = await (
    await fetch(`${protocol}://${host}/api/get-all-posts?skip=${1 * skip}`)
  ).json();

  return { props: { posts: entries, total } };
};
