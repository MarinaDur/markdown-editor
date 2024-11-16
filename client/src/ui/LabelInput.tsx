import { styled } from "styled-components";

interface LabelInputProps {
  //   children: React.ReactNode;
  name: string;
  htmlFor: string;
}

const StyledLabelInput = styled.label`
  width: 100%;
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

function LabelInput({ name, htmlFor }: LabelInputProps) {
  return <StyledLabelInput htmlFor={htmlFor}>{name}</StyledLabelInput>;
}

export default LabelInput;
