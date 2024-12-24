import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

interface FontAwesomeIconsProps {
  handleLogout?: () => void;
}

// Styled component
const StyledFontAwesomeIcons = styled.div`
  font-size: 1.7rem;
  color: var(--cl-white-global);
  cursor: pointer;

  &:hover {
    color: var(--cl-orange-hover);
    transition: all 0.4s ease-in-out;
  }
`;

function FontAwesomeIcons({ handleLogout }: FontAwesomeIconsProps) {
  return (
    <StyledFontAwesomeIcons>
      <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={handleLogout} />
    </StyledFontAwesomeIcons>
  );
}

export default FontAwesomeIcons;
