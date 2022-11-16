import { CenterCol, ImgWrapper, PageWrapper } from "../styles/components";
import { GetServerSideProps, NextPage } from "next";
import { getDisplayDatetime, getDomainInfo } from "../util";
import { breakpoints } from "../styles/constants";
import Image from "next/image";
import { Page } from "../util/types";
import { PubDate } from "./blog/post/[postId]";
import SEO from "../components/seo";
import { pageMapping } from "../util/db";
import styled from "styled-components";

interface Props {
  page: Page;
}

const RightPane = styled.section`

  @media only screen and (min-width: ${breakpoints.sm}px) {
    display: flex;
    flex-direction: column;
    align-items: space-evenly;
    width: 70%
  }
`;

const LeftPane = styled.section`
  @media only screen and (min-width: ${breakpoints.sm}px) {
    display: flex;
    flex-direction: column;
    align-items: space-evenly;
    width: 30%;
  }
`;

const Header = styled.section`
display: flex;
    flex-direction: column;
    align-items: space-evenly;
h1 {
  display: inline-block;
  width: 50%;
  font-size: 2.5rem;
  line-height: 1.75rem;
  font-weight: 250;
  letter-spacing: 3px;
  font-family: "Outfit", sans-serif;
}

  @media only screen and (min-width: ${breakpoints.sm}px) {
    position: fixed;
  }
`;

const SitePage: NextPage<Props> = ({ page }: Props) => {
  if (!page) {
    return null;
  }

  return (
    <>
      <SEO pageTitle={page.title} description={page.description} />
      <PageWrapper>
        <CenterCol>
        <LeftPane>
          <Header>
              <h1>{page.title}</h1>
              <PubDate>
                Published: 
                <br></br> 
                {getDisplayDatetime(page.updated)}
              </PubDate>
          </Header>

          {page.featuredImage?.url && (
              <ImgWrapper>
                <Image
                  src={`https:${page.featuredImage.url}`}
                  alt={page.featuredImage.title}
                  fill={true}
                  style={{
                    objectFit: "contain"
                  }}
                  sizes="70vw"
                />
              </ImgWrapper>
            )}
        </LeftPane>
        <RightPane>
          <div dangerouslySetInnerHTML={{ __html: page.content! }} />
        </RightPane>
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

  // For some reason, landing page produces a .js pageName.
  if (!pageName || pageName.includes('.js')) {
    return { props: { page: {} } };
  }

  const pageId = pageMapping[pageName as string];

  const [host, protocol] = getDomainInfo(req.headers.host);

  const { page } = await (
    await fetch(`${protocol}://${host}/api/get-single-page?id=${pageId}`)
  ).json();

  return { props: { page } };
};
