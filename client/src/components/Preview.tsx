import { ReactNode } from "react";
import { styled, css } from "styled-components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownHeader from "../ui/MarkdownHeader";
import width from "../ui/Width";
import flex from "../ui/Flex";
import { useMarkdown } from "../context/MarkdownContext";
import paddingPM from "../ui/PaddingPM";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import Blockquote from "../ui/Blockquote";
import Link from "../ui/Link";
import PreCodeBlock from "../ui/PreCodeBlock";
import CodeCodeBlock from "../ui/CodeCodeBlock";
import Hr from "../ui/Hr";
import Img from "../ui/Img";

interface StyledPreviewProps {
  $isPreview: boolean;
}

const StyledPreview = styled.div<StyledPreviewProps>`
  ${width}
  height: 100%;
  /* ${flex} */
  min-height: calc(100vh - 72px);

  @media (min-width: 768px) {
    ${(props) =>
      props.$isPreview &&
      css`
        ${flex}
        justify-content: flex-start;
      `}
  }

  flex-direction: column;
  overflow-x: hidden;
`;

interface ListProps {
  children: ReactNode;
}

const StyledUl = styled(Paragraph)`
  list-style-type: circle;
  list-style: inside;
`;

const StyledOl = styled(Paragraph)`
  list-style: inside;
  list-style-type: decimal;
`;

const StyledMarkDownCon = styled.div<StyledPreviewProps>`
  text-align: left;
  ${paddingPM}
  ${flex}
  flex-direction: column;
  align-items: flex-start;
  gap: 2.2rem;
  /* height: 100%; */
  @media (min-width: 768px) {
    padding-inline: 2.4rem;

    ${(props) =>
      props.$isPreview &&
      css`
        width: 93%;
        max-width: 900px;
      `}
  }

  @media (min-width: 1024px) {
    ${(props) =>
      props.$isPreview &&
      css`
        width: 80%;
      `}
  }
`;

const components = {
  ul: ({ children, ...props }: ListProps) => (
    <StyledUl as="ul" $type="preview" {...props}>
      {children}
    </StyledUl>
  ),
  ol: ({ children, ...props }: ListProps) => (
    <StyledOl as="ol" $type="preview" {...props}>
      {children}
    </StyledOl>
  ),
  h1: ({ children, ...props }: ListProps) => (
    <Heading as="h1" $type="preview" {...props}>
      {children}
    </Heading>
  ),
  h2: ({ children, ...props }: ListProps) => (
    <Heading as="h2" $type="preview" {...props}>
      {children}
    </Heading>
  ),
  h3: ({ children, ...props }: ListProps) => (
    <Heading as="h3" $type="preview" {...props}>
      {children}
    </Heading>
  ),
  h4: ({ children, ...props }: ListProps) => (
    <Heading as="h4" $type="preview" {...props}>
      {children}
    </Heading>
  ),
  h5: ({ children, ...props }: ListProps) => (
    <Heading as="h5" $type="preview" {...props}>
      {children}
    </Heading>
  ),
  h6: ({ children, ...props }: ListProps) => (
    <Heading as="h6" $type="preview" {...props}>
      {children}
    </Heading>
  ),
  p: ({ children, ...props }: ListProps) => (
    <Paragraph $type="preview" {...props}>
      {children}
    </Paragraph>
  ),
  blockquote: ({ children, ...props }: ListProps) => (
    <Blockquote {...props}>{children}</Blockquote>
  ),
  a: ({ children, ...props }: ListProps) => <Link {...props}>{children}</Link>,
  pre: ({ children, ...props }: ListProps) => (
    <PreCodeBlock {...props}>{children}</PreCodeBlock>
  ),
  code: ({ children, ...props }: ListProps) => (
    <CodeCodeBlock {...props}>{children}</CodeCodeBlock>
  ),
  hr: ({ children, ...props }: ListProps) => <Hr {...props}>{children}</Hr>,
  img: ({ children, ...props }: ListProps) => <Img {...props}>{children}</Img>,
  // Add similar definitions for other components as needed
};

function Preview() {
  const { isPreview, markdownValue } = useMarkdown();

  return (
    <StyledPreview className="preview" $isPreview={isPreview}>
      <MarkdownHeader title="PREVIEW" type="preview" />
      {/* <Paragraph $type="markdown">Preview</Paragraph> */}
      <StyledMarkDownCon $isPreview={isPreview}>
        {markdownValue !== "" ? (
          <Markdown remarkPlugins={[remarkGfm]} components={components as any}>
            {markdownValue}
          </Markdown>
        ) : (
          <Paragraph $type="preview">Nothing to show yet...</Paragraph>
        )}
      </StyledMarkDownCon>
    </StyledPreview>
  );
}

export default Preview;
