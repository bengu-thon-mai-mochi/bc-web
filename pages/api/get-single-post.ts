import type { NextApiRequest, NextApiResponse } from "next";

import { createContentfulClient } from "../../util/db";

export type BlogPost = {
  id: string;
  title: string;
  published: string;
  content: string;
  featuredImage: {
    url: string;
    title: string;
  };
};

type Data = {
  entry: BlogPost;
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

  const entry: BlogPost = {
    id: result.sys.id,
    title: result.fields.title,
    published: result.fields.published,
    content: result.fields.content,
    featuredImage: {
      title: result.fields.featuredImage?.fields.title,
      url: result.fields.featuredImage?.fields.file.url,
    },
  };

  res.status(200).json({ entry });
}
