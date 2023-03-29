import styled from "styled-components";

export const ModalContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  padding: 0 1rem;
  background-color: var(--c-black-overlay);
`;

export const Content = styled.main`
  max-width: 26.875rem;
  padding: 2rem;
  margin: 4.375rem auto 0;
  background-color: var(--c-gray-200);
  border-radius: var(--b-radius);
`;
