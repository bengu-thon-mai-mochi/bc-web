import styled from "styled-components";
import Thumbnail from "./thumbnail";
import CardContent from "./card-content";
import { breakpoints } from "../../styles/constants";
import { BlogPost } from "../../util/types";

const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  width: 100%;

  @media only screen and (min-width: ${breakpoints.sm}px) {
    gap: 1rem;
    flex-direction: row;
  }
`;

interface Props {
    imgData: {
        url: string;
        title: string;
    },
    post: BlogPost
}

const Card = ({ imgData, post }: Props) => {
  return (
    <Post>
        <Thumbnail imgData={imgData}></Thumbnail>
        <CardContent post={post}></CardContent>
    </Post>
  );
};

export default Card;
