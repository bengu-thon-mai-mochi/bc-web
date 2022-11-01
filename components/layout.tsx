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
          Home
        </Link>

        <Link href="/blog/1">
          Blog
        </Link>

        <Link href="/biodiversity-singapore">
          Biodiversity Singapore
        </Link>

        <Link href="/open-science">
          Open Science
        </Link>

        <Link href="/about-us">
          About us
        </Link>
      </Nav>
      {children}
    </Wrapper>
  );
};

export default Layout;
