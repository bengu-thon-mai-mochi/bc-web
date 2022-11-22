import { breakpoints } from "../../styles/constants";
import styled from "styled-components";
import Image from "next/image";

const ImgWrapper = styled.div`
  position: relative;
  width: 175px;
  height: 175px;
  border-radius: 25px;
  font-family: "Outfit", sans-serif;
  border: 1px dashed #73AD21;
  color: silver;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 25px;
  }

  @media only screen and (min-width: ${breakpoints.sm}px) {
    min-width: 200px;
    height: 200px;
    border-radius: 25px;
    padding: 15px;
  }
`;

interface Props {
  imgData: {
    url: string;
    title: string;
    }
}

const Thumbnail = ({ imgData }: Props) => {
  return (
    <ImgWrapper>
    {imgData.url ? (
      <Image
        src={`https:${imgData.url}`}
        alt={imgData.title}
        fill={true}
        style={{
          objectFit: "contain"
        }}
        sizes="10vw"
      />
    ) : (
      "No image"
    )}
  </ImgWrapper>
  );
};

export default Thumbnail;
