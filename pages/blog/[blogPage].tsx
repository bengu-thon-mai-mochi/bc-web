import { CenterCol, PageWrapper } from "../../styles/components";
import type { GetServerSideProps, NextPage } from "next";
import { getDomainInfo } from "../../util";
import { BlogPost } from "../../util/types";
import { breakpoints } from "../../styles/constants";
import { skipDefault } from "../../util/db";
import styled from "styled-components";
import Pagination  from "../../components/Blog/pagination";
import Card from "../../components/Blog/card";

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-weight: 300;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    gap: 3rem;
  }
`;

interface Props {
  posts: BlogPost[];
  pages: number;
}

const Blog: NextPage<Props> = ({ posts, pages }: Props) => {
  return (
    <PageWrapper>
      <CenterCol>
        <PostsWrapper>
          <h1>Blog</h1>
          {!!posts.length &&
            posts.map((post) => (
              <PostWrapper key={post.title}>
                <Card imgData={post.featuredImage} post={post}></Card>
              </PostWrapper>
            ))}

        <Pagination pages={pages}></Pagination>
        </PostsWrapper>
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
  const blogPage =
    query.blogPage === undefined || query.blogPage === "1"
      ? 0
      : parseInt(query.blogPage as string, 10) - 1;

  const { entries, pages } = await (
    await fetch(
      `${protocol}://${host}/api/get-all-posts?skip=${blogPage * skipDefault}`
    )
  ).json();

  return { props: { posts: entries, pages } };
};
