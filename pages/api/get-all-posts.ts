// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import getConfig from "next/config";

const {
  serverRuntimeConfig: { CONTENTFUL_CDA_KEY },
} = getConfig();

export type Blogpost = {
  title: string;
  published: string;
  description: string;
  featuredImage: {
    url: string;
    title: string;
  };
};

type Data = {
  entries: Blogpost[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const contentful = require("contentful");

  const client = contentful.createClient({
    space: "d3mitm0kcpu1",
    accessToken: CONTENTFUL_CDA_KEY,
  });

  const entries = await client.getEntries({
    content_type: "blogpost",
  });

  const overviewDetailsOnly: Blogpost[] = entries.items.map((item: any) => ({
    title: item.fields.title,
    published: item.fields.published,
    description: item.fields.description,
    featuredImage: {
      title: item.fields.featuredImage?.fields.title,
      url: item.fields.featuredImage?.fields.file.url,
    },
  }));

  res.status(200).json({ entries: overviewDetailsOnly });
}
