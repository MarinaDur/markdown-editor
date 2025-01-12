import { styled } from "styled-components";
import flex from "./Flex";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Button from "./Button";
import { useMarkdown } from "../context/MarkdownContext";
import SlidingScreen from "./SlidingScreen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument } from "../utils/apiCalls";
import { MarkDownDocs } from "../interfaces/documets";

const StyledPopup = styled.div`
  width: 90%;
  background: var(--cl-bg-main);
  border-radius: 4px;
  padding: 2.4rem;
  ${flex}
  gap: 1.6rem;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 34.3rem;
`;

function DeletePopup() {
  const {
    // deleteDoc,
    deleteDocPopup,
    handleCloseDeleteDocPopup,
    // documents,
    currentDoc,
    setCurrentDoc,
    setDeleteDocPopup,
  } = useMarkdown();

  const queryClient = useQueryClient();
  const documents = queryClient.getQueryData<MarkDownDocs[]>(["documents"]);

  const mutation = useMutation({
    mutationFn: deleteDocument,
    onMutate: async (deletedDocId) => {
      await queryClient.cancelQueries({ queryKey: ["documents"] });

      const previousDocs = queryClient.getQueryData<MarkDownDocs[]>([
        "documents",
      ]);

      queryClient.setQueryData(["documents"], (oldDocs: MarkDownDocs[]) =>
        oldDocs.filter((doc) => doc._id !== deletedDocId)
      );

      return { previousDocs };
    },
    onError: (err, deletedDocId, context) => {
      if (context?.previousDocs) {
        queryClient.setQueryData(["documents"], context.previousDocs);
      }
      console.log("Error adding new doc:", err);
    },
    onSuccess: () => {
      setCurrentDoc(0);
      setDeleteDocPopup(false);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  function handledeleteMarkdown() {
    if (
      documents &&
      typeof currentDoc === "number" && // Ensure currentDoc is a valid number
      currentDoc >= 0 &&
      currentDoc < documents.length
    ) {
      const docToDelete = documents[currentDoc]; // Retrieve the document by index
      mutation.mutate({ id: docToDelete._id });
    } else {
      console.error("Invalid document index or documents array is undefined.");
    }
  }

  return (
    <SlidingScreen
      isOpen={deleteDocPopup}
      handleClosePopUp={handleCloseDeleteDocPopup}
      isSliding={true}
    >
      <StyledPopup
        onClick={(e) => {
          e.stopPropagation(); // Stop propagation from StyledPopup to SlidingScreen
        }}
      >
        <Heading as="h4" $type="preview">
          Delete this document?
        </Heading>
        <Paragraph $type="preview">
          {`Are you sure you want to delete the '${
            documents
              ? documents[currentDoc ? currentDoc : 0]?.name
              : "untitled"
          }' document and its
          contents? This action cannot be reversed.`}
        </Paragraph>
        {/* <Button text="Confirm & Delete" /> */}
        <Button
          text="Confirm & Delete"
          handleClick={handledeleteMarkdown}
          isLoading={mutation.isPending}
        />
      </StyledPopup>
    </SlidingScreen>
  );
}

export default DeletePopup;
