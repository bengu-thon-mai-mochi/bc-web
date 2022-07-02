import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  background-color: antiquewhite;
`;

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Nav>
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/blog/1">
          <a>Blog</a>
        </Link>

        <Link href="/biodiversity-singapore">
          <a>Biodiversity Singapore</a>
        </Link>

        <Link href="/open-science">
          <a>Open Science</a>
        </Link>

        <Link href="/about-us">
          <a>About us</a>
        </Link>
      </Nav>
      {children}
    </Wrapper>
  );
};

export default Layout;
