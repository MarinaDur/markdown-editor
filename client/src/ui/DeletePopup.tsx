import { styled, keyframes } from "styled-components";
import flex from "./Flex";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Button from "./Button";
import { useMarkdown } from "../context/MarkdownContext";
import SlidingScreen from "./SlidingScreen";

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
  } = useMarkdown();
  return (
    <SlidingScreen
      isOpen={deleteDocPopup}
      handleClosePopUp={handleCloseDeleteDocPopup}
    >
      <StyledPopup>
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
    </SlidingScreen>
  );
}

export default DeletePopup;
