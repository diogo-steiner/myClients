import styled from "styled-components";

export const Container = styled.main`
  margin-top: 2rem;
`;

export const AddClient = styled.section`
  background-color: var(--c-gray-200);
  padding: 1.5rem;
  border-radius: var(--b-radius);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: var(--f-size-2);
  }

  button {
    width: max-content;
  }
`;
