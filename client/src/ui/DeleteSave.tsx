import { styled } from "styled-components";
import Svg from "./Svg";
import { useMarkdown } from "../context/MarkdownContext";
import { MarkDownDocs } from "../interfaces/documets";
import { updateDocument } from "../utils/apiCalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";

interface StylesSaveConProps {
  $isLoading: boolean;
}

const StyledSaveCon = styled.div<StylesSaveConProps>`
  background: var(--cl-orange) url("icon-save.svg") no-repeat center;
  border-radius: 4px;
  min-width: 4rem;
  /* aspect-ratio: 1; */
  height: 4rem;
  cursor: pointer;
  pointer-events: ${(props) => (props.$isLoading ? "none" : "auto")};

  &:hover {
    background-color: var(--cl-orange-hover);
    transition: background-color 0.5s ease-in-out;
  }

  @media (min-width: 768px) {
    padding: 1rem 1.5rem 1.2rem 3.2rem;
    background-position: 1rem;
    min-width: 139.43px;
  }

  @media (max-width: 767px) {
    span {
      display: none;
    }

    & {
      background: ${(props) =>
        props.$isLoading
          ? 'url("spinner.gif") center/cover no-repeat'
          : 'var(--cl-orange) url("icon-save.svg") no-repeat center'};
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
  const { handleDeleteDocPopup, markdownValue, docNameValue } = useMarkdown();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateDocument,
    onSuccess: (data: any) => {
      queryClient.setQueryData<MarkDownDocs[] | undefined>(
        ["documents"],
        (oldData) =>
          oldData?.map((doc) =>
            doc._id === data._id ? { ...doc, ...data } : doc,
          ),
      );

      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  function handleSaveMarkdown() {
    if (document !== undefined) {
      mutation.mutate({
        id: document._id,
        name: docNameValue ?? "Untitled",
        content: markdownValue ?? "",
      });
    }
    // else {
    //   console.error("Documents or current document is undefined.");
    // }
  }

  return (
    <>
      <Svg
        width="18"
        height="20"
        d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
        fill="#7C8187"
        handleClick={handleDeleteDocPopup}
        curser="pointer"
        hoverFill="hsla(13, 75%, 58%, 1)"
      />
      <StyledSaveCon
        onClick={handleSaveMarkdown}
        $isLoading={mutation.isPending}
      >
        {mutation.isPending ? (
          <Loader />
        ) : (
          <StyledSaveBtnText>Save changes</StyledSaveBtnText>
        )}
      </StyledSaveCon>
    </>
  );
}

export default DeleteSave;
