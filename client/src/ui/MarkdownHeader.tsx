import { styled } from "styled-components";
import flex from "./Flex";
import Paragraph from "./Paragraph";
import PreviewButton from "./PreviewButton";
import width from "./Width";
import padding from "./Padding";
import { useMarkdown } from "../context/MarkdownContext";

interface MarkdownHeadeProps {
  title: string;
  type: string;
}

const StyledMarkdownHeader = styled.div`
  ${flex}
  ${width}
  justify-content: space-between;
  ${padding}
  padding-top: 0.8rem;
  padding-bottom: 1rem;
  background: var(--cl-bg-m-p-title);
  flex-wrap: nowrap;
  white-space: nowrap;
`;

function MarkdownHeader({ title, type }: MarkdownHeadeProps) {
  const { handleShowPreview, isPreview } = useMarkdown();
  return (
    <StyledMarkdownHeader>
      <Paragraph $type="markdown">{title}</Paragraph>

      <PreviewButton
        onClick={handleShowPreview}
        $isPreview={isPreview}
        $type={type}
      />
    </StyledMarkdownHeader>
  );
}

export default MarkdownHeader;
