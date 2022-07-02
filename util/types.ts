export type BlogPost = {
  id: string;
  title: string;
  published: string;
  description?: string;
  content?: string;
  featuredImage: {
    url: string;
    title: string;
  };
};

export type Page = {
  id: string;
  slug: string;
  title: string;
  updated: string;
  description?: string;
  content?: string;
  featuredImage: {
    url: string;
    title: string;
  };
};
