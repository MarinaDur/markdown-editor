import { styled } from "styled-components";
import textInputNameAndAll from "./TextInputNameAndAll";
import { ChangeEvent } from "react";

interface InputProps {
  type: string;
  id: string;
  name: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
  border: 2px solid var(--cl-orange);
  font-size: 1.5rem;
  ${textInputNameAndAll}
  color: var(--cl-text-main);

  &:focus {
    outline: none;
  }
`;

function Input({
  type,
  id,
  name,
  placeholder,
  value,
  handleChange,
}: InputProps) {
  return (
    <StyledInput
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  );
}

export default Input;
