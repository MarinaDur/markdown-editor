import { styled, css } from "styled-components";

type SvgProps = {
  width: string;
  height: string;
  d: string;
  fillRule?: "inherit" | "nonzero" | "evenodd" | undefined;
  fill: string;
  handleClick?: () => void;
  curser?: string;
  hoverFill?: string;
};

type StyledSvgProps = {
  $curser?: string;
  $hoverFill?: string;
};

const StyledSvg = styled.svg<StyledSvgProps>`
  /* fill: var(--cl-white);
  opacity: 0.5;
  transition: all 0.2s ease-in-out; */

  &:hover {
    opacity: 1;
    fill: ${(props) => props.$hoverFill};
    transition: all 0.5s ease-in-out;
  }

  ${(props) =>
    props.$curser === "pointer" &&
    css`
      cursor: pointer;
    `}
`;

function Svg({
  width,
  height,
  d,
  fillRule,
  fill,
  curser,
  handleClick,
  hoverFill,
}: SvgProps) {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fillRule={fillRule}
      fill={fill}
      onClick={handleClick}
      $curser={curser}
      $hoverFill={hoverFill}
    >
      <path d={d} />
    </StyledSvg>
  );
}

export default Svg;
