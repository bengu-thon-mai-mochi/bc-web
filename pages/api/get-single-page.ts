import type { NextApiRequest, NextApiResponse } from "next";

import { Page } from "../../util/types";
import { createContentfulClient } from "../../util/db";

type Data = {
  page: Page;
};

type ErrorType = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorType>
) {
  const { id } = req.query;

  if (!id) {
    return res.status(404).json({ msg: "Resource not found" });
  }

  const result = await createContentfulClient().getEntry<any>(id as string);

  const page: Page = {
    id: result.sys.id,
    slug: result.fields.slug,
    title: result.fields.title,
    updated: result.sys.updatedAt,
    content: result.fields.content,
    description: result.fields.description,
    featuredImage: {
      title: result.fields.featuredImage?.fields.title,
      url: result.fields.featuredImage?.fields.file.url,
    },
  };

  res.status(200).json({ page });
}
