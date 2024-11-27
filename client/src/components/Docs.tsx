import { styled } from "styled-components";
import flex from "../ui/Flex";
import DocTitle from "../ui/DocTitle";
import { useMarkdown } from "../context/MarkdownContext";
import { useQuery } from "@tanstack/react-query";
import { fetchDocuments } from "../utils/apiCalls";
import { useEffect } from "react";

interface MarkDownDocs {
  createdAt: string;
  name: string;
  content: string;
  _id: string;
}

const StyledDocs = styled.div`
  ${flex}
  gap: 2.7rem;
  flex-direction: column;
`;

function Docs() {
  const { handleCurrentDoc, currentDoc } = useMarkdown();
  const {
    data: documents,
    isLoading,
    isError,
    error,
  } = useQuery<MarkDownDocs[]>({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  });

  useEffect(() => {
    localStorage.setItem("currentDoc", (currentDoc ?? 0).toString());
  }, [currentDoc]);

  return (
    <StyledDocs>
      {documents?.map((doc, index) => (
        <DocTitle
          doc={doc}
          key={doc.name}
          handleClick={() => handleCurrentDoc(index, doc._id)}
        />
      ))}
    </StyledDocs>
  );
}

export default Docs;
