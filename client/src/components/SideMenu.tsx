import { styled } from "styled-components";
import flex from "../ui/Flex";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import width from "../ui/Width";
import Docs from "./Docs";
import { useMarkdown } from "../context/MarkdownContext";
import transition from "../ui/Transition";
import ColorTheme from "./ColorTheme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "../utils/apiCalls";
import { MarkDownDocs } from "../interfaces/documets";

interface StyledSideMenuConProps {
  $isMenuOpen: boolean;
}

const StyledSideMenuCon = styled.div<StyledSideMenuConProps>`
  width: ${(props) => (props.$isMenuOpen ? "250px" : "0")};
  min-height: 100%;
  background: var(--cl-bg-slider);
  ${flex}
  align-items: flex-start;
  ${transition}
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  height: 100%;
`;

const StyledSideMenu = styled.div`
  padding: 2.7rem 0;
  ${width}
  ${flex}
  flex-direction: column;
  gap: 2.7rem;
  align-items: flex-start;
  width: 80%;
  height: 100%;
  justify-content: flex-start;
`;

const StyledTile = styled(Heading)`
  @media (min-width: 1024px) {
    display: none;
  }
`;

function SideMenu() {
  // const { isMenuOpen, handleAddNewDoc } = useMarkdown();
  const { isMenuOpen, setCurrentDoc } = useMarkdown();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createDocument,
    onMutate: async (newDoc) => {
      // Log new document creation

      await queryClient.cancelQueries({ queryKey: ["documents"] });

      const previousDocs = queryClient.getQueryData<MarkDownDocs[]>([
        "documents",
      ]);

      queryClient.setQueryData(
        ["documents"],
        (old: MarkDownDocs[] | undefined) => [...(old || []), newDoc]
      );

      return { previousDocs };
    },
    onError: (__, _, context) => {
      if (context?.previousDocs) {
        queryClient.setQueryData(["documents"], context.previousDocs);
      }
    },
    onSuccess: () => {
      setCurrentDoc(0);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  function handleCreateMarkdown() {
    const existingDocs =
      queryClient.getQueryData<MarkDownDocs[]>(["documents"]) || [];

    // Extract numbers from document names
    const numbers = existingDocs.map((doc) => {
      const match = doc.name.match(/untitled-document-(\d+)\.md/);
      return match ? parseInt(match[1], 10) : 0;
    });

    // Find the maximum number and increment it
    const maxNumber = Math.max(0, ...numbers);
    const newDocNumber = maxNumber + 1;
    const newDocName = `untitled-document-${newDocNumber}.md`;

    // Send the mutation with the generated name
    mutation.mutate({
      name: newDocName,
      content: "",
    });
  }

  return (
    <StyledSideMenuCon $isMenuOpen={isMenuOpen}>
      <StyledSideMenu>
        <StyledTile as="h2">MARKDOWN</StyledTile>
        <Heading as="h3">MY DOCUMENT</Heading>
        <Button
          handleClick={handleCreateMarkdown}
          text="+ New Document"
          isLoading={mutation.isPending}
        />
        <Docs />
        <ColorTheme />
      </StyledSideMenu>
    </StyledSideMenuCon>
  );
}

export default SideMenu;
