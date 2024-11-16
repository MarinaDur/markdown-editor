import { styled } from "styled-components";
import width from "./Width";

const PreCodeBlock = styled.pre`
  background: var(--cl-bg-blockquote);
  border-radius: 4px;
  padding: 2.4rem;
  ${width}
`;

export default PreCodeBlock;
