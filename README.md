## Todo

- Style inserted HTML from Contentful
- Delete `created`, `published`, and `updated` string fields from blog entries in Contentful
  - These have been deprecated in favour of `createdAt`, `publishedAt`, and `updatedAt` datetime fields
- Maybe delete `createdAt` field since they seem to be later than `publishedAt`, which makes no sense
- Add comments, and categories, from Contentful

## Things to note

- Pages are hardcoded

  - If you create new pages, get a dev to update the navigation bar

- Blog entries are first retrieved by Contentful's `sys.createdAt` field (items created solely from new Contentful account), and then by each entry's `publishedAt` field (migrated from old postgres solution)

## References

[Contentful content delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/)
