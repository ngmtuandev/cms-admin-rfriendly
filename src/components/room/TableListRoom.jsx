import React, { useEffect, useState } from "react";
import { Table, Select, message, Modal, Input } from "antd";
import { useUpdateStatusRoom } from "../../hooks/room/useUpdateStatusRoom";
import icons from "../../utils/icons";
import { useGetListFacilities } from "../../hooks/facilities/useGetListFacilities";

const TableListRoom = ({ listRoomData }) => {
  const { mutate: $updateStatusRoom } = useUpdateStatusRoom();
  const { facilities, isLoading: isLoadingFacilities } = useGetListFacilities();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nameFacilityOptions =
    facilities &&
    facilities?.map((item) => ({
      value: item?.nameFacility,
      label: item?.nameFacility,
    }));
  const [dataRoomEdit, setDataRoomEdit] = useState({
    price: 0,
    numberPerson: 0,
    description: "",
    title: "",
    stakeMoney: 0,
    location: "",
    district: "",
    leaseTerm: 0,
    convenientNearArea: null,
    imageRooms: null,
    facilities: null,
    coupon: null,
    typeRoom: "",
    statusRoom: "",
  });
  const { FaEdit } = icons;
  const { TextArea } = Input;

  const handleChange = (value, id) => {
    $updateStatusRoom(
      { id, value },
      {
        onSuccess: () => {
          message.success("Update status room successfully !");
        },
        onError: () => {
          message.error("Update status room failure !");
        },
      }
    );
  };

  const handleEditRoom = (data) => {
    setDataRoomEdit({
      price: data.price,
      numberPerson: data.numberPerson,
      description: data.description,
      title: data.title,
      stakeMoney: data.stakeMoney,
      location: data.location,
      district: data.district,
      leaseTerm: data.leaseTerm,
      facilities:
        data?.facilities &&
        data?.facilities?.map((item) => ({
          value: item?.nameFacility,
          label: item?.nameFacility,
        })),
    });

    console.log("facilities : ", dataRoomEdit.facilities);

    showModal();
  };

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Number of Persons",
      dataIndex: "numberPerson",
      key: "numberPerson",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status Room",
      dataIndex: "statusRoom",
      key: "statusRoom",
      render: (statusRoom, id) => (
        <Select
          defaultValue={statusRoom}
          style={{ width: 120 }}
          onChange={(value) => {
            handleChange(value, id?.id);
          }}
          options={[
            { value: "EMPTY", label: "EMPTY" },
            { value: "DEPOSIT", label: "DEPOSIT" },
            { value: "INACTIVE", label: "INACTIVE" },
          ]}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type Room",
      dataIndex: "typeRoom",
      key: "typeRoom",
      render: (typeRoom) => <span>{typeRoom?.name}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (data) => {
        return (
          <div onClick={() => handleEditRoom(data)}>
            <FaEdit
              className="cursor-pointer hover:bg-opacity-75"
              size={25}
              color="#FFB40C"
            ></FaEdit>
          </div>
        );
      },
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeFacilities = (value) => {
    console.log("handleChangeFacilities : ", value);
  };

  return (
    <div className="">
      <Modal
        title="Title"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ style: { background: "#FFB40C" } }}
        onCancel={handleCancel}
        width={800}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              value={dataRoomEdit.title}
              name="title"
              placeholder="title"
            />
            <Input
              value={dataRoomEdit.price}
              name="price"
              placeholder="price"
            />
            <Input
              value={dataRoomEdit.numberPerson}
              name="numberPerson"
              placeholder="numberPerson"
            />
          </div>
          <div className="flex gap-4">
            <Input
              value={dataRoomEdit.stakeMoney}
              name="stakeMoney"
              placeholder="stakeMoney"
            />
            <Input
              value={dataRoomEdit.district}
              name="district"
              placeholder="district"
            />
            <Input
              value={dataRoomEdit.leaseTerm}
              name="leaseTerm"
              placeholder="leaseTerm"
            />
          </div>
          <div className="flex gap-4">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              defaultValue={dataRoomEdit.facilities}
              onChange={handleChangeFacilities}
              options={nameFacilityOptions && nameFacilityOptions}
            />
            <Input
              value={dataRoomEdit.coupon}
              name="coupon"
              placeholder="coupon"
            />
          </div>
          <div className="flex gap-4">
            <Input
              value={dataRoomEdit.typeRoom}
              name="typeRoom"
              placeholder="typeRoom"
            />
            <Input
              value={dataRoomEdit.statusRoom}
              name="statusRoom"
              placeholder="statusRoom"
            />
          </div>
          <Input
            value={dataRoomEdit.location}
            name="location"
            placeholder="location"
          />
          <TextArea
            value={dataRoomEdit.description}
            name="description"
            placeholder="description"
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </div>
      </Modal>
      <Table dataSource={listRoomData} columns={columns} />
    </div>
  );
};

export default TableListRoom;
