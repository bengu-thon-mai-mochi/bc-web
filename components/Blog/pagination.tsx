import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
const BlogPageLinks = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  font-weight: 400;
  font-family: "Outfit", sans-serif;

  a.active {
    font-family: 'Fauna One', serif;
    font-weight: 600;
    font-size: 1.25rem;
    text-decoration: underline;
    color: brown;
  }
`;

interface Props {
  pages: number;
}

const Pagination = ({ pages }: Props) => {
  const router = useRouter();
  const { blogPage } = router.query;

  return (
    <BlogPageLinks>
          {pages &&
            Array(pages)
              .fill(undefined) 
              .map((_, idx) => {
                const page = idx + 1;

                return (
                  <Link 
                    href={`/blog/${page}`} 
                    key={idx} 
                    className={Number(blogPage) === page ? "active" : ""}
                  >
                    {page}
                  </Link>
                );
              })}
    </BlogPageLinks>
  );
};

export default Pagination;
