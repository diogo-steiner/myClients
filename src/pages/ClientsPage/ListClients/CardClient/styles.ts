import styled from "styled-components";

export const CardClientContainer = styled.li`
  padding: 1.5rem 2rem;
  border: 1px solid var(--c-gray-400);
  border-radius: var(--b-radius);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border-color: var(--c-primary);
  }

  div p {
    line-height: 1.6;

    :first-child {
      font-weight: var(--f-weight-1);
    }

    :not(:first-child) {
      font-size: var(--f-size-4);
      color: var(--c-gray-600);
    }
  }

  button {
    padding: 0.25rem;

    svg {
      font-size: 1.125rem;
      color: var(--c-gray-600);
    }
  }
`;
