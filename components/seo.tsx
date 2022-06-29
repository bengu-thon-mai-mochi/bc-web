import { NextPage } from "next";
import { NextSeo } from "next-seo";

const appDescription =
  "A network for biodiversity, citizen science, and open science";
const appName = "Biodiversity Connections";
const appUrl = "https://biodiversityconnections.com";

interface Props {
  pageTitle?: string;
  description?: string;
  image?: {
    url: string;
    alt: string;
  };
  imageUrl?: string;
}

const SEO: NextPage<Props> = ({ pageTitle, description, image }) => {
  const title = pageTitle ? `${pageTitle} | ${appName}` : appName;

  const pageDescription = description ?? appDescription;

  let pageUrl;
  if (typeof window !== "undefined") {
    pageUrl = window.location.href ?? appUrl;
  }

  const pageImage = image ?? {
    url: `${appUrl}/vercel.svg`,
    width: 400,
    height: 400,
    alt: `${appName} logo`,
  };

  return (
    <NextSeo
      title={title}
      description={pageDescription}
      canonical={pageUrl}
      openGraph={{
        url: pageUrl,
        title: title,
        description: pageDescription,
        images: [pageImage],
        site_name: appName,
      }}
      noindex={true}
      nofollow={true}
    />
  );
};

export default SEO;
