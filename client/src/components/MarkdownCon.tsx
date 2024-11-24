import { styled, css } from "styled-components";
import { useLocation } from "react-router-dom";
import Preview from "./Preview";
import flex from "../ui/Flex";
import width from "../ui/Width";
import Editor from "./Editor";
import { useMarkdown } from "../context/MarkdownContext";
import Paragraph from "../ui/Paragraph";
import Heading from "../ui/Heading";
import { useEffect } from "react";
import axios from "axios";

interface StyledMarkdownConProps {
  $isPreview: boolean;
}

const StyledMarkdownCon = styled.div<StyledMarkdownConProps>`
  ${flex}
  ${width}
  align-items: flex-start;
  height: 100%;
  flex-grow: 1;
  background: var(--cl-bg-main);

  @media (max-width: 767px) {
    .editor {
      ${(props) =>
        props.$isPreview &&
        css`
          display: none;
        `}
    }
    .preview {
      ${(props) =>
        !props.$isPreview &&
        css`
          display: none;
        `}
    }
  }

  @media (min-width: 768px) {
    .editor {
      ${(props) =>
        props.$isPreview &&
        css`
          display: none;
        `}
    }
  }
`;

const StyledPlaceHNoDoc = styled.div`
  max-width: 27rem;
  ${flex}
  text-align: center;
  padding-top: 5rem;
`;

function MarkdownCon() {
  const {
    isPreview,
    documents,
    handleLogout,
    setDocuments,
    setCurrentDocId,
    currentDoc,
    setMarkdownValue,
    setCurrentDoc,
  } = useMarkdown();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/documents/getUserDocs",

          { withCredentials: true }
        );

        setDocuments(response?.data?.data?.data);
        setCurrentDocId(response?.data?.data?.data[currentDoc || 0]?._id);
        setMarkdownValue(response?.data?.data?.data[currentDoc || 0]?.content);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Error getting docs", error);
        }
      }
    };

    fetchDocuments();
  }, [setDocuments, setCurrentDocId, currentDoc, setMarkdownValue]);

  useEffect(() => {
    // Check if the current document ID is stored in sessionStorage
    console.log("useEffect triggered");

    const storedDocIndex = parseInt(
      sessionStorage.getItem("currentDoc") || "0",
      10
    );
    console.log("stored index", storedDocIndex);
    if (storedDocIndex) {
      // If it exists, use it to set the current document ID
      setCurrentDoc(storedDocIndex);
    }
  }, [setCurrentDoc]);

  //  // Function to fetch documents from the server
  //  const fetchDocuments = async () => {
  //    try {
  //      const docResponse = await axios.get(
  //        "http://127.0.0.1:8000/api/v1/documents/getUserDocs",
  //        { withCredentials: true }
  //      );

  //      const userDocs = docResponse?.data?.data?.data;

  //      // Update state with user documents
  //      setDocuments(userDocs);
  //      setMarkdownValue(userDocs[0]?.content || "");
  //      setCurrentDocId(userDocs[0]._id);

  //      // Cache documents in localStorage
  //    } catch (error) {
  //      console.error("Failed to fetch documents", error);
  //      setDocuments(docsData); // Fallback to default documents
  //      setMarkdownValue(docsData[1]?.content || "");
  //    }
  //  };

  return (
    <StyledMarkdownCon $isPreview={isPreview}>
      {documents.length > 0 ? (
        <>
          <Editor />
          <Preview />
        </>
      ) : (
        <StyledPlaceHNoDoc>
          <Heading as="h4" $type="preview">
            Click on the side menu to create a new document
          </Heading>
        </StyledPlaceHNoDoc>
      )}
    </StyledMarkdownCon>
  );
}

export default MarkdownCon;
