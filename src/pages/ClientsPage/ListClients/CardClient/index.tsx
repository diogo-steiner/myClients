import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IClient } from "../../../../contexts/auth";
import { handleCreateMuskPhone } from "../../../../utils/inputMuskPhone";
import { ModalClient } from "./ModalClient";
import { CardClientContainer } from "./styles";

interface ICardClientProps {
  client: IClient;
}

export const CardClient = ({ client }: ICardClientProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenCloseModal = () => setIsOpenModal(!isOpenModal);

  const dataClient = new Date(client.createdAt);
  const clientSince = dataClient.toLocaleDateString();
  const numberFormatted = handleCreateMuskPhone(client.mobileNumber);

  return (
    <>
      <CardClientContainer>
        <div>
          <p>
            {client.firstName} {client.lastName}
          </p>
          <p>{client.email}</p>
          <p>{numberFormatted}</p>
          <p>{clientSince}</p>
        </div>
        <button type="button" onClick={handleOpenCloseModal}>
          <HiOutlinePencilSquare />
        </button>
      </CardClientContainer>

      <ModalClient
        isOpen={isOpenModal}
        handleCloseModal={handleOpenCloseModal}
        client={client}
      />
    </>
  );
};
