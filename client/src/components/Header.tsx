import { styled } from "styled-components";
import width from "../ui/Width";
import flex from "../ui/Flex";
import MenuIcon from "../ui/MenuIcon";
import DocTitle from "../ui/DocTitle";
import DeleteSave from "../ui/DeleteSave";
import { useMarkdown } from "../context/MarkdownContext";
import Heading from "../ui/Heading";
import { Document } from "../interfaces/documets";
import Logout from "./Logout";

// interface Documents {
//   documents?: MarkDownDocs[] | undefined;
// }

const StyledHeaderCon = styled.header`
  background: var(--cl-bg-header);
  ${flex}
  ${width}
  overflow-x: hidden;

  /* flex: 1; */
`;

const StylesHeader = styled.div`
  ${width}
  ${flex}
  justify-content: space-between;
  padding: 0 1.2rem 0 2.4rem;
  overflow: hidden;
  flex: 1;
  gap: 0.5rem;

  @media (min-width: 768px) {
    padding: 0 1.6rem 0 0;
  }
`;

const StyledCon = styled.div`
  ${flex}
  flex-direction: row;
  width: 95%;

  @media (min-width: 768px) {
    width: 47.5%;
  }
`;

const StyledTitle = styled(Heading)`
  padding-inline: 2.5rem;
  /* border-right: 1px solid var(--cl-bg-theme); */
  margin-right: 2.4rem;
  position: relative;

  @media (max-width: 1023px) {
    display: none;
  }

  @media (min-width: 1024px) {
    &:after {
      content: "";
      /* padding-left: 2.5rem; */
      width: 1px;
      height: 6rem;
      background: var(--cl-bg-theme);
      display: block;
      position: absolute;
      top: -1rem;
      right: 0rem;
    }
  }
`;

const StyledDeleteSaveLogoutCon = styled.div`
  ${flex}
  ${width}
  gap: 1rem;
  justify-content: flex-end;
  width: 52.5%;
`;

function Header({ documents }: Document) {
  const {
    isMenuOpen,
    handleToggleMenu,
    currentDoc,
    // documents,
    handleChangeName,
    docNameValue,
    // handleInputBlur,
    // documents,
  } = useMarkdown();

  return (
    <StyledHeaderCon>
      <MenuIcon onClick={handleToggleMenu} $isMenuOpen={isMenuOpen} />
      <StylesHeader>
        <StyledCon>
          <StyledTitle as="h2">MARKDOWN</StyledTitle>
          {documents?.map(
            (doc, index) =>
              currentDoc === index && (
                <DocTitle
                  key={doc._id}
                  doc={doc}
                  placement="header"
                  handleChange={handleChangeName}
                  value={docNameValue}
                  // handleBlur={handleInputBlur}
                />
              ),
          )}
        </StyledCon>
        <StyledDeleteSaveLogoutCon>
          {documents && documents.length > 0 && (
            <DeleteSave document={documents[currentDoc || 0]} />
          )}
          <Logout />
        </StyledDeleteSaveLogoutCon>
      </StylesHeader>
    </StyledHeaderCon>
  );
}

export default Header;
