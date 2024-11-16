import { styled } from "styled-components";
import flex from "../ui/Flex";
import DocTitle from "../ui/DocTitle";
import { useMarkdown } from "../context/MarkdownContext";

const StyledDocs = styled.div`
  ${flex}
  gap: 2.7rem;
  flex-direction: column;
`;

function Docs() {
  const { documents, handleCurrentDoc } = useMarkdown();

  return (
    <StyledDocs>
      {documents.map((doc, index) => (
        <DocTitle
          doc={doc}
          key={doc.name}
          handleClick={() => handleCurrentDoc(index)}
        />
      ))}
    </StyledDocs>
  );
}

export default Docs;
