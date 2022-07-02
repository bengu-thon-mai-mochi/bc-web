import { CenterCol, ImgWrapper, PageWrapper } from "../styles/components";
import { GetServerSideProps, NextPage } from "next";
import { getDisplayDatetime, getDomainInfo, pageMapping } from "../util";

import Image from "next/image";
import { Page } from "../util/types";
import { PubDate } from "./blog/post/[postId]";
import styled from "styled-components";

interface Props {
  page: Page;
}

const SitePage: NextPage<Props> = ({ page }: Props) => {
  if (!page) {
    return null;
  }

  console.log(page.updated);

  return (
    <>
      {/* <SEO pageTitle={post.title} description={post.description} /> */}
      <PageWrapper>
        <CenterCol>
          <h1>{page.title}</h1>

          <PubDate>Published: {getDisplayDatetime(page.updated)}</PubDate>

          {page.featuredImage.url && (
            <ImgWrapper>
              <Image
                src={`https:${page.featuredImage.url}`}
                alt={page.featuredImage.title}
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="cover"
                sizes="70vw"
              />
            </ImgWrapper>
          )}

          <div dangerouslySetInnerHTML={{ __html: page.content! }} />
        </CenterCol>
      </PageWrapper>
    </>
  );
};

export default SitePage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const pageName = query.pageName;
  if (!pageName) {
    return { props: { page: {} } };
  }

  const pageId = pageMapping[pageName as string];

  const [host, protocol] = getDomainInfo(req.headers.host);

  const { page } = await (
    await fetch(`${protocol}://${host}/api/get-single-page?id=${pageId}`)
  ).json();

  return { props: { page } };
};
