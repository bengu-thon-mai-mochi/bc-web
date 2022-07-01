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
