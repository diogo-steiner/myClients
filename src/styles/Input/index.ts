import styled from "styled-components";

export const InputStyled = styled.input`
  font-size: 1rem;
  font-weight: var(--f-weight-2);
  color: var(--c-gray-700);
  width: 100%;
  margin-top: 0.375rem;
  padding: 0.75rem 1rem;
  background-color: var(--c-gray-100);
  border: 1px solid transparent;
  border-radius: var(--b-radius);
  box-sizing: border-box;

  &:focus {
    border-color: var(--c-primary);
  }

  &:disabled {
    color: var(--c-gray-500);
  }
`;
