import { styled } from "styled-components";

interface MenuIconProps {
  $isMenuOpen: boolean;
}

const MenuIcon = styled.button<MenuIconProps>`
  background: ${(props) =>
    `var(--cl-bg-menu-header) ${
      props.$isMenuOpen ? `url("icon-close.svg") ` : `url("icon-menu.svg")`
    }  no-repeat center`};
  width: 5.6rem;
  height: 5.6rem;
  border: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    border: none;
    outline: none;
  }

  &:hover {
    background-color: var(--cl-orange);
  }

  @media (min-width: 768px) {
    width: 7.2rem;
    height: 7.2rem;
  }
`;

export default MenuIcon;
