import { breakpoints } from "./constants";
import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
`;

export const CenterCol = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
  margin: 3rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    letter-spacing: 1px;
    line-height: 1.75rem;
    font-family: "Outfit", sans-serif;
  }

  h2 {
    font-size: 2rem;
    font-weight: 200;
    letter-spacing: 1px;
  }

  a {
    color: black;

    :hover {
      color: brown;
    }
  }

  @media only screen and (min-width: ${breakpoints.sm}px) {
    width: ${breakpoints.sm}px;
    display: flex;
    flex: 1;
    flex-direction: row;
    gap: 1.5rem;
    margin: 3rem;
  }
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
`;


export const LandingPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 90vh;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    gap: 1.5rem;
    flex: 1;
    width: 100%;
  }
`;
