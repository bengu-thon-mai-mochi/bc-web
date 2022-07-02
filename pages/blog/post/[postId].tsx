import { CenterCol, ImgWrapper, PageWrapper } from "../../../styles/components";
import type { GetServerSideProps, NextPage } from "next";
import { getDisplayDatetime, getDomainInfo } from "../../../util";

import { BlogPost } from "../../../util/types";
import Image from "next/image";
import SEO from "../../../components/seo";
import styled from "styled-components";

export const PubDate = styled.span`
  font-style: italic;
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

          <PubDate>Published: {getDisplayDatetime(post.published)}</PubDate>

          {post.featuredImage.url && (
            <ImgWrapper>
              <Image
                src={`https:${post.featuredImage.url}`}
                alt={post.featuredImage.title}
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="cover"
                sizes="70vw"
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
