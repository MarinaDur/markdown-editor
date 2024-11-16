import { styled, css } from "styled-components";

interface HeadingProps {
  $type?: "preview";
}

const Heading = styled.h1<HeadingProps>`
  font-family: "Roboto Slab", sans-serif;
  line-height: normal;
  color: var(--cl-text-preview-header);
  font-weight: 700;

  ${(props) =>
    props.as === "h2" &&
    css`
      color: var(--cl-white-global);
      font-family: "Commissioner", sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 5px;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      color: var(--cl-text-sub);
      font-family: "Roboto", sans-serif;
      font-size: 1.4rem;
      font-weight: 500;
      letter-spacing: 2px;
    `}

  ${(props) =>
    props.as === "h1" &&
    props.$type === "preview" &&
    css`
      font-size: 3.2rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    props.$type === "preview" &&
    css`
      color: var(--cl-text-preview-header);
      font-family: "Roboto Slab", sans-serif;
      font-size: 2.8rem;
      font-weight: 400;
      letter-spacing: normal;
    `}

  ${(props) =>
    props.as === "h3" &&
    props.$type === "preview" &&
    css`
      font-size: 2.4rem;
      font-family: "Roboto Slab", sans-serif;
      color: var(--cl-text-preview-header);
      font-weight: 700;
      letter-spacing: normal;
    `}

  ${(props) =>
    props.as === "h4" &&
    props.$type === "preview" &&
    css`
      font-size: 2rem;
    `}

  ${(props) =>
    props.as === "h5" &&
    props.$type === "preview" &&
    css`
      font-size: 1.6rem;
    `}

  ${(props) =>
    props.as === "h6" &&
    props.$type === "preview" &&
    css`
      font-size: 1.4rem;
      color: var(--cl-orange);
    `}
`;

export default Heading;
