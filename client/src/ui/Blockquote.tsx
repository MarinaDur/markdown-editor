import { styled } from "styled-components";
import Paragraph from "./Paragraph";

const Blockquote = styled.blockquote`
  background: var(--cl-bg-blockquote);
  border-left: 4px solid var(--cl-orange);
  border-radius: 4px;
  padding: 2.4rem;

  p {
    font-weight: 700;
    color: var(--cl-text-main);
  }
`;

export default Blockquote;
