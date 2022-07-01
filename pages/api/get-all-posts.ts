import type { NextApiRequest, NextApiResponse } from "next";

import { BlogPost } from "../../util/types";
import { createContentfulClient } from "../../util/db";

type Data = {
  entries: BlogPost[];
  total: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { skip } = req.query;

  const entries = await createContentfulClient().getEntries({
    content_type: "blogpost",
    skip,
    limit: 20,
    order: "-sys.createdAt",
  });

  const overviewDetailsOnly: BlogPost[] = entries.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    published: item.fields.published,
    description: item.fields.description,
    featuredImage: {
      title: item.fields.featuredImage?.fields.title,
      url: item.fields.featuredImage?.fields.file.url,
    },
  }));

  res.status(200).json({ entries: overviewDetailsOnly, total: entries.total });
}
