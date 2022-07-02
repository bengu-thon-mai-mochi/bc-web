import { CenterCol, PageWrapper } from "../.";
import type { GetServerSideProps, NextPage } from "next";
import { getDisplayDatetime, getDomainInfo } from "../../../util";

import { BlogPost } from "../../../util/types";
import SEO from "../../../components/seo";

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
    await fetch(`${protocol}://${host}/api/get-single-post?id=${query.id}`)
  ).json();

  return { props: { post: entry } };
};
