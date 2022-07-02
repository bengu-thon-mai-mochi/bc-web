import { breakpoints } from "./constants";
import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
`;

export const CenterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin: 0 0.5rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    letter-spacing: 1px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 200;
    letter-spacing: 1px;
  }

  a {
    color: dodgerblue;

    :hover {
      color: deeppink;
    }
  }

  @media only screen and (min-width: ${breakpoints.sm}px) {
    width: ${breakpoints.sm}px;

    h1 {
      font-size: 3.5rem;
    }
  }
`;

export const ImgWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  max-height: 800px;
`;
