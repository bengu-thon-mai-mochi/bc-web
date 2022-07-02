import { CenterCol, PageWrapper } from "../[blogPage]";
import type { GetServerSideProps, NextPage } from "next";
import { getDisplayDatetime, getDomainInfo } from "../../../util";

import { BlogPost } from "../../../util/types";
import Image from "next/image";
import SEO from "../../../components/seo";
import styled from "styled-components";

const ImgWrapper = styled.div`
  display: block;
  /* position: relative; */
  width: 100%;
  height: 100%;
  max-height: 800px;
  background-color: red;
`;

interface Props {
  post: BlogPost;
}

const BlogPostPage: NextPage<Props> = ({ post }: Props) => {
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

          {post.featuredImage.url && (
            <ImgWrapper>
              <Image
                src={`https:${post.featuredImage.url}`}
                alt={post.featuredImage.title}
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="cover"
                // sizes="10vw"
              />
            </ImgWrapper>
          )}

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
  const [host, protocol] = getDomainInfo(req.headers.host);

  const { entry } = await (
    await fetch(`${protocol}://${host}/api/get-single-post?id=${query.postId}`)
  ).json();

  return { props: { post: entry } };
};
