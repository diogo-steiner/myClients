import styled from "styled-components";

export const ModalHeaderContainer = styled.header`
  position: relative;

  h2 {
    font-size: var(--f-size-2);
  }
`;

export const ButtonCloseModal = styled.button`
  position: absolute;
  top: -0.3125rem;
  right: 0px;
  background-color: var(--c-gray-300);
  padding: 0.375rem;
  border-radius: var(--b-radius);
  display: flex;

  svg {
    font-size: 1.125rem;
    color: var(--c-gray-100);
  }
`;
