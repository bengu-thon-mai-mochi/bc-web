import Link from "next/link";
import styled from "styled-components";
import { BlogPost } from "../../util/types";
import { breakpoints } from "../../styles/constants";
import { getDisplayDatetime } from "../../util";

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;

  h2 {
    font-size: 1.1rem;
    font-weight: 400;
  }

  @media only screen and (min-width: ${breakpoints.sm}px) {
    font-size: 1.2rem;

    h2 {
      font-size: 1.3rem;
    }
  }
`;

const PubDate = styled.span`
  margin-top: 0.3rem;
  margin-bottom: 0.7rem;
  font-style: italic;
`;

interface Props {
    post: BlogPost;
}

const CardContent = ({ post }: Props) => {
  return (
    <Content>
        <h2>
            <Link href={`/blog/post/${post.id}`}>
                {post.title}
            </Link>
        </h2>
        <PubDate>
            Published: {getDisplayDatetime(post.published)}
        </PubDate>
        <p>{post.description}</p>
    </Content>
  );
};

export default CardContent;
