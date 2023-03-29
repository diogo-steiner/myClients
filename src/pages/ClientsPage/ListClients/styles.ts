import styled from "styled-components";

export const ListClientsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16.875rem, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding: 2rem;
  background-color: var(--c-gray-200);
  border-radius: var(--b-radius);
`;
