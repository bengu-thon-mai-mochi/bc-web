import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const BlogPageLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  font-weight: 400;
  font-family: "Outfit", sans-serif;
  margin-bottom: 40px;
  
  a {
    color: black;
  }

  a.active {
    font-family: 'Fauna One', serif;
    font-weight: 600;
    font-size: 1.25rem;
    text-decoration: underline;
    color: brown;
  }
  
  a:hover {
    color: brown;
  }

  .disabled {
    display: none;
  }
`;

interface Props {
  pages: number;
}

const Pagination = ({ pages }: Props) => {
  const router = useRouter();
  const { blogPage } = router.query;
  const currentPage = Number(blogPage);
  const pagination =  Array(pages).fill(undefined) 
  const paginationElements = [];

  return (
      <BlogPageLinks>
        <Link 
          href={`/blog/${currentPage - 1}`} 
          className={currentPage === 1 ? "disabled": ""}
        >
          Previous
        </Link>
            {pages &&
              pagination
                .map((_, idx) => {
                  const page = idx + 1;

                  paginationElements.push(
                    <Link 
                      href={`/blog/${page}`} 
                      key={idx} 
                      className={currentPage === page ? "active" : ""}
                    >
                      {page}
                    </Link>
                  );
                })
               
              } 
              { 
                currentPage < 3 
                ? paginationElements.slice(0 , 5) 
                : paginationElements.slice(currentPage - 3 , currentPage + 2)
              }
        <Link 
          href={`/blog/${currentPage + 1}`} 
          className={currentPage === pages ? "disabled": ""}
        >
          Next
        </Link>
      </BlogPageLinks>
  );
};

export default Pagination;
