import type { NextApiRequest, NextApiResponse } from "next";
import { createContentfulClient, limit, skipDefault } from "../../util/db";

import { BlogPost } from "../../util/types";
import { EntryCollection } from "contentful";

type Data = {
  entries: BlogPost[];
  pages: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const skip = parseInt(req.query.skip as string, 10);

  const client = createContentfulClient();

  const newEntries = await client.getEntries({
    content_type: "blogpost",
    skip,
    limit,
    "fields.createdAt[exists]": false,
    order: "-sys.createdAt",
  });

  const newPosts: BlogPost[] = getNeededFieldsOnly(newEntries);

  const forCountOnly = await client.getEntries({
    content_type: "blogpost",
    limit: 0,
  });

  const totalEntries = forCountOnly.total;

  const pages = Math.ceil(totalEntries / skipDefault);

  if (newEntries.total > skip) {
    const diff = limit - newEntries.items.length;

    if (diff === 0) {
      return res.status(200).json({
        entries: newPosts,
        pages,
      });
    }

    if (diff > 0 && diff < limit) {
      const oldEntries = await client.getEntries({
        content_type: "blogpost",
        limit: diff,
        order: "-fields.createdAt",
      });

      const oldPosts: BlogPost[] = getNeededFieldsOnly(oldEntries);

      const combinedPosts = [...newPosts, ...oldPosts];

      return res.status(200).json({
        entries: combinedPosts,
        pages,
      });
    }
  }

  const forNewEntryCount = await client.getEntries({
    content_type: "blogpost",
    "fields.createdAt[exists]": false,
  });

  const newEntriesCount = forNewEntryCount.total;

  const oldEntries = await client.getEntries({
    content_type: "blogpost",
    skip: skip - newEntriesCount,
    limit,
    "fields.createdAt[exists]": true,
    order: "-fields.publishedAt",
  });

  const oldPosts: BlogPost[] = getNeededFieldsOnly(oldEntries);

  res.status(200).json({
    entries: oldPosts,
    pages,
  });
}

const getNeededFieldsOnly = (entries: EntryCollection<unknown>) =>
  entries.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    published: item.fields.publishedAt ?? item.sys.createdAt,
    description: item.fields.description,
    featuredImage: {
      title: item.fields.featuredImage?.fields.title,
      url: item.fields.featuredImage?.fields.file.url,
    },
  }));
