import styled from "styled-components";

export const ListMenuContainer = styled.div`
  background-color: var(--c-gray-200);
  border-radius: 0 0 var(--b-radius) var(--b-radius);
  position: absolute;
  top: 3.125rem;
  right: 0;
  overflow: hidden;

  button {
    color: var(--c-gray-600);
    font-size: 1.25rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    transition: background-color, 0.1s ease;

    &:hover {
      background-color: var(--c-gray-300);
    }
  }
`;
