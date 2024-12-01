import { styled } from "styled-components";
import flex from "./Flex";
import Svg from "./Svg";
import { useMarkdown } from "../context/MarkdownContext";
import width from "./Width";
import {
  Document,
  MarkDownDocs,
  UpdateDocumentResponse,
  UpdateDocumentVariables,
} from "../interfaces/documets";
import { updateDocument } from "../utils/apiCalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const StyledDeleteSave = styled.div`
  ${flex}
  ${width}
  gap: 1.9rem;
  justify-content: flex-end;
  width: 52.5%;
`;

const StyledSaveCon = styled.div`
  background: var(--cl-orange) url("icon-save.svg") no-repeat center;
  border-radius: 4px;
  min-width: 4rem;
  /* aspect-ratio: 1; */
  height: 4rem;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: var(--cl-orange-hover);
  }

  @media (min-width: 768px) {
    padding: 1rem 1.5rem 1.2rem 3.2rem;
    background-position: 1rem;
  }

  @media (max-width: 767px) {
    span {
      display: none;
    }
  }
`;

const StyledSaveBtnText = styled.span`
  color: var(--cl-white-global);
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
`;

function DeleteSave({ document }: { document: MarkDownDocs }) {
  const { handleDeleteDocPopup, currentDoc, markdownValue, docNameValue } =
    useMarkdown();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateDocument,
    onSuccess: (data: any) => {
      queryClient.setQueryData<MarkDownDocs[] | undefined>(
        ["documents"],
        (oldData) =>
          oldData?.map((doc) =>
            doc._id === data._id ? { ...doc, ...data } : doc
          )
      );
    },
  });

  function handleSaveMarkdown() {
    console.log("mutatae doc", document, markdownValue, docNameValue);
    if (document !== undefined) {
      mutation.mutate({
        id: document._id,
        name: docNameValue ?? "Untitled",
        content: markdownValue ?? "",
      });
    } else {
      console.error("Documents or current document is undefined.");
    }
  }

  return (
    <StyledDeleteSave>
      <Svg
        width="18"
        height="20"
        d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
        fill="#7C8187"
        handleClick={handleDeleteDocPopup}
        curser="pointer"
        hoverFill="hsla(13, 75%, 58%, 1)"
      />
      <StyledSaveCon onClick={handleSaveMarkdown}>
        <StyledSaveBtnText>Save changes</StyledSaveBtnText>
      </StyledSaveCon>
    </StyledDeleteSave>
  );
}

export default DeleteSave;
