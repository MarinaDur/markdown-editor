import { styled, keyframes } from "styled-components";
import flex from "./Flex";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Button from "./Button";
import { useMarkdown } from "../context/MarkdownContext";

interface StyledPopupProps {
  $isOpen: boolean;
}

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledDeletePopup = styled.div<StyledPopupProps>`
  background: var(--cl-overlay-delete);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: absolute;
  top: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};

  left: 0;
  z-index: 10000;
  /* ${flex} */
  transition: top 2s ease;
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : "none")} 2s forwards;
`;

const StyledPopup = styled.div<StyledPopupProps>`
  width: 90%;
  background: var(--cl-bg-main);
  border-radius: 4px;
  padding: 2.4rem;
  ${flex}
  gap: 1.6rem;
  flex-direction: column;
  align-items: flex-start;
  /* animation: ${({ $isOpen }) =>
    $isOpen ? slideIn : "none"} 0.8s forwards; */
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
  } = useMarkdown();
  return (
    <StyledDeletePopup
      $isOpen={deleteDocPopup}
      onClick={handleCloseDeleteDocPopup}
    >
      <StyledPopup $isOpen={deleteDocPopup}>
        <Heading as="h4" $type="preview">
          Delete this document?
        </Heading>
        <Paragraph $type="preview">
          {`Are you sure you want to delete the '${
            "template" // documents[currentDoc ? currentDoc : 1]?.name
          }' document and its
          contents? This action cannot be reversed.`}
        </Paragraph>
        <Button text="Confirm & Delete" />
        {/* <Button text="Confirm & Delete" handleClick={deleteDoc} /> */}
      </StyledPopup>
    </StyledDeletePopup>
  );
}

export default DeletePopup;
