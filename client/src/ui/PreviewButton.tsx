import { styled } from "styled-components";

interface PreviewButtonProps {
  $isPreview: boolean;
  $type?: string;
}

const PreviewButton = styled.button<PreviewButtonProps>`
  width: 3rem;
  height: 3rem;
  background: ${(props) =>
    props.$type === "preview"
      ? `url('icon-hide-preview.svg') center right no-repeat`
      : `url('icon-show-preview.svg') center right no-repeat`};
  border: none;

  &:focus {
    border: none;
    outline: none;
  }

  @media (min-width: 768px) {
    background: ${(props) =>
      props.$type === "preview"
        ? props.$isPreview
          ? `url('icon-hide-preview.svg') center right no-repeat`
          : `url('icon-show-preview.svg') center right no-repeat`
        : "none"};
  }
`;

export default PreviewButton;
