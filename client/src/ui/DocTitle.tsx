import { styled, css } from "styled-components";
import flex from "./Flex";
import Svg from "./Svg";
import Paragraph from "./Paragraph";
import width from "./Width";
import { MarkDownDocs } from "../context/MarkdownContext";
import textGeneral from "./TextGeneral";
import textInputNameAndAll from "./TextInputNameAndAll";
import { ChangeEvent } from "react";

interface DocTitleProps {
  placement?: string;
  doc?: MarkDownDocs;
  handleClick?: () => void;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  handleBlur?: () => void;
}

interface StyledSubDocNameProps {
  $placement?: string;
}

const StyledDocTitle = styled.div`
  ${flex}
  ${width}
  gap: 1rem;
  cursor: pointer;

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    padding-left: 10px;
  }
`;

const StyledNameCon = styled.div`
  ${flex}
  flex-direction: column;
  gap: 0.3rem;
  ${width} /* flex: 1; */
  align-items: flex-start;
`;

const StyledSubDocName = styled(Paragraph)<StyledSubDocNameProps>`
  ${(props) =>
    props.$placement === "header" &&
    css`
      @media (max-width: 767px) {
        display: none;
      }
    `}
`;

const StyledInput = styled.input`
  ${textGeneral}
  ${textInputNameAndAll}
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  width: 100%;

  &:focus,
  &:hover {
    border-bottom: 1px solid var(--cl-white-global);
    outline: none;
  }
`;

function DocTitle({
  placement,
  doc,
  handleClick,
  handleChange,
  value,
  handleBlur,
}: DocTitleProps) {
  return (
    <StyledDocTitle onClick={handleClick}>
      <Svg
        width="19"
        height="16"
        d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z"
        fill="#FFF"
      />
      <StyledNameCon>
        <StyledSubDocName $placement={placement} $type="all-sub">
          {placement !== "header" && doc?.createdAt}
          {placement === "header" && "Document Name"}
        </StyledSubDocName>
        {placement === "header" ? (
          <StyledInput
            value={value}
            onChange={handleChange}
            // onBlur={handleBlur}
          />
        ) : (
          <Paragraph $type="all">{doc?.name}</Paragraph>
        )}
      </StyledNameCon>
    </StyledDocTitle>
  );
}

export default DocTitle;
