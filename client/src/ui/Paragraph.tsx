import { styled, css } from "styled-components";
import textGeneral from "./TextGeneral";
import textInputNameAndAll from "./TextInputNameAndAll";

type ParagraphProps = {
  $type: "all" | "all-sub" | "markdown" | "preview" | "img";
};

const Paragraph = styled.p<ParagraphProps>`
  ${textGeneral}

  ${(props) =>
    props.$type === "all" &&
    css`
      ${textInputNameAndAll}
    `}

  ${(props) =>
    props.$type === "all-sub" &&
    css`
      color: var(--cl-text-sub);
      font-family: "Roboto", sans-serif;
      font-size: 1.3rem;
      font-weight: 300;
      line-height: normal;
    `}

  ${(props) =>
    props.$type === "markdown" &&
    css`
      color: var(--cl-text-paragraphs);
      font-family: "Roboto Mono", sans-serif;
      letter-spacing: 2px;
      overflow-wrap: break-word;
      word-break: break-word;
    `}

  ${(props) =>
    props.$type === "preview" &&
    css`
      color: var(--cl-text-paragraphs);
      font-family: "Roboto Slab", sans-serif;
      overflow-wrap: break-word;
      word-break: break-word;
    `}

  ${(props) =>
    props.$type === "img" &&
    css`
      margin: 0 auto;
    `}
`;

export default Paragraph;
