import { LandingPage, PageWrapper } from "../styles/components";
import { FbIcon, MailIcon, TwitterIcon } from "../components/icons";
import type { NextPage } from "next";
import { breakpoints } from "../styles/constants";
import styled from "styled-components";

const Section1 = styled.section`
  display: flex;
  flex-direction: column;
  padding: 25px 25px;
  padding: 20px;
  margin: 15px 15px 0 15px;
  align-items: space-evenly;

  h1 {
    display: inline-block;
    width: 50%;
    font-size: 2.5rem;
    line-height: 1.75rem;
    font-weight: 250;
    letter-spacing: 3px;
    font-family: "Outfit", sans-serif;
  }

  p {
    display: inline-block;
    font-size: 1.25rem;
    font-weight: 200;
    letter-spacing: 3px;
    padding-left: 20%;
    padding-right: 20%;
    line-height: 1.25rem;
    font-family: 'Fauna One', serif;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 50%;
  justify-content: center;
  aling-items: flex-start;
  padding: 25px;
  border: 1px solid #73AD21;
  border-radius: 25px;
  margin: 0 15px;
  font-family: "Outfit", sans-serif;
  border-style: dashed;
  

  h2 {
    text-align: center;
    font-size: 2.0rem;
    font-weight: 250;
    letter-spacing: 1px;
  }
  
  a {
    display: inline flex;
    font-size: 1.0rem;
    text-decoration: underline;
  }

  a:hover {
    background-color: #9dd350;
    display: inline flex;
    font-size: 0.95rem;
    font-family: 'Fauna One', serif;
    text-decoration: underline;
  }
`;

const SocialMediaWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    justify-content: flex-start;
  }
`;

const Main = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  
  @media only screen and (min-width: ${breakpoints.sm}px) {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
`;

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <LandingPage>
        <Section1>
          <h1>Biodiversity Connections</h1>
          <p>Conservation and science meetups since 201X.</p>
        </Section1>
        <Main>
        <Section>
          <h2>Mailing list</h2>
          <p>
            Subscribe to our{" "}
            <a
              href="https://biodiversityconnections.org/sign-up-form/"
              target="_blank"
              rel="noreferrer"
            >
              mailing list
            </a>{" "}
            to meet the most awesome people in the world! You&apos;ll meet
            conservationists, biologists, other researchers and scientists, and
            learn loads of cool stuff.
          </p>
        </Section>

        <Section>
          <h2>Contact</h2>
          <p>
            Got questions? Want to know more about where you can help out? Mail
            us any time at{" "}
            <a
              href="mailto:https://biodiversityconnections.org/sign-up-form/"
              target="_blank"
              rel="noreferrer"
            >
              biodiversityconnections@gmail.com
            </a>{" "}
            for details on how to donate.
          </p>
        </Section>
        </Main>
        <Section>
          <h2>Follow us</h2>

          <SocialMediaWrapper>
            <a
              href="https://www.facebook.com/groups/1632856730333768/"
              rel="noreferrer"
              target="_blank"
              aria-label="Email"
            >
              <MailIcon />
            </a>

            <a
              href="https://twitter.com/BioDconnections"
              rel="noreferrer"
              target="_blank"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </a>

            <a
              href="https://www.facebook.com/groups/1632856730333768/"
              rel="noreferrer"
              target="_blank"
              aria-label="Facebook"
            >
              <FbIcon height="31px" width="31px" />
            </a>
          </SocialMediaWrapper>
        </Section>
      </LandingPage>
    </PageWrapper>
  );
};

export default Home;
