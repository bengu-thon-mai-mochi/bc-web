import { CenterCol, PageWrapper } from "../styles/components";
import { FbIcon, MailIcon, TwitterIcon } from "../components/icons";

import type { NextPage } from "next";
import { breakpoints } from "../styles/constants";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <CenterCol>
        <h1>Landing page</h1>

        <Section>
          <h2>Events</h2>
        </Section>

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
      </CenterCol>
    </PageWrapper>
  );
};

export default Home;
