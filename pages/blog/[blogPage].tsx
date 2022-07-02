import { CenterCol, PageWrapper } from "../../styles/components";
import type { GetServerSideProps, NextPage } from "next";
import { getDisplayDatetime, getDomainInfo } from "../../util";

import { BlogPost } from "../../util/types";
import Image from "next/image";
import Link from "next/link";
import { breakpoints } from "../../styles/constants";
import styled from "styled-components";

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-weight: 300;
  width: 100%;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    gap: 3rem;
  }
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  width: 100%;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    gap: 1rem;
    flex-direction: row;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 175px;
  height: 175px;
  border-radius: 5px;
  background-color: gainsboro;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 5px;
  }

  @media only screen and (min-width: ${breakpoints.sm}px) {
    min-width: 200px;
    height: 200px;
  }
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;

  h2 {
    font-size: 1.1rem;
    font-weight: 400;
  }

  @media only screen and (min-width: ${breakpoints.sm}px) {
    font-size: 1.2rem;

    h2 {
      font-size: 1.3rem;
    }
  }
`;

const PubDate = styled.span`
  margin-top: 0.3rem;
  margin-bottom: 0.7rem;
  font-style: italic;
`;

const Hr = styled.hr`
  border-top: 1px solid lavender;
`;

const BlogPageLinks = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
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
              <PostWrapper key={post.title}>
                <Post>
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
                    <PubDate>
                      Published: {getDisplayDatetime(post.published)}
                    </PubDate>
                    <p>{post.description}</p>
                  </Content>
                </Post>

                <Hr />
              </PostWrapper>
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
