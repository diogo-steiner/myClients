import { IClient } from "../../../contexts/auth";
import { CardClient } from "./CardClient";
import { ListClientsContainer } from "./styles";

interface IListClientsProps {
  clients: IClient[];
}

export const ListClients = ({ clients }: IListClientsProps) => {
  return (
    <ListClientsContainer>
      {clients.map((client: IClient) => (
        <CardClient key={client.id} client={client} />
      ))}
    </ListClientsContainer>
  );
};
