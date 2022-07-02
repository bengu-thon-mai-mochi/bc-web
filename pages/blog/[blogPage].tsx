import type { GetServerSideProps, NextPage } from "next";
import { getDisplayDatetime, getDomainInfo } from "../../util";
import { useEffect, useState } from "react";

import { BlogPost } from "../../util/types";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../../styles/constants";
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

  @media only screen and (min-width: ${breakpoints.sm}px) {
    flex-direction: row;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  min-width: 200px;
  height: 200px;
  border-radius: 5px;
  background-color: gainsboro;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 5px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

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
                <ImgWrapper>
                  {post.featuredImage.url ? (
                    <Image
                      src={`https:${post.featuredImage.url}`}
                      alt={post.featuredImage.title}
                      layout="fill"
                      objectFit="cover"
                      sizes="10vw"
                    />
                  ) : (
                    "No image"
                  )}
                </ImgWrapper>

                <Content>
                  <h2>
                    <Link href={`/blog/post/${post.id}`}>
                      <a>{post.title}</a>
                    </Link>
                  </h2>
                  <span>Published: {getDisplayDatetime(post.published)}</span>
                  <p>{post.description}</p>
                </Content>
              </Post>
            ))}
        </PostsWrapper>

        <BlogPageLinks>
          {pages &&
            Array(pages)
              .fill(undefined)
              .map((_, idx) => {
                const page = idx + 1;

                return (
                  <Link href={`/blog/${page}`} key={idx}>
                    <a>{page}</a>
                  </Link>
                );
              })}
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
  const blogPage = query.blogPage ? parseInt(query.blogPage as string, 10) : 1;

  const { entries, total } = await (
    await fetch(
      `${protocol}://${host}/api/get-all-posts?skip=${blogPage * skip}`
    )
  ).json();

  return { props: { posts: entries, total } };
};
