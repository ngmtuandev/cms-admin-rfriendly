import React from "react";
import TableListRoom from "./TableListRoom";
import { useGetListRooms } from "../../hooks/room/useListRooms";

const ListRooomComponent = () => {
  const { rooms } = useGetListRooms();

  return (
    <div className="px-main my-6">
      <TableListRoom listRoomData={rooms?.data}></TableListRoom>
    </div>
  );
};

export default ListRooomComponent;
