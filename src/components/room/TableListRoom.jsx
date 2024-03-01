import React, { useState } from "react";
import { Table, Select, message, Modal, Input } from "antd";
import { useUpdateStatusRoom } from "../../hooks/room/useUpdateStatusRoom";
import { useUpdateRoom } from "../../hooks/room/useUpdateRoom";
import icons from "../../utils/icons";
import { useGetListFacilities } from "../../hooks/facilities/useGetListFacilities";
import { useGetListCoupons } from "../../hooks/coupon/useGetListCoupon";
import formatDate from "../../helper/formatDate";
import { StatusRoomConstant } from "../../constants/StatusRoomConstant";

const TableListRoom = ({ listRoomData }) => {
  const { mutate: $updateStatusRoom } = useUpdateStatusRoom();
  const { mutate: $updateRoom } = useUpdateRoom();
  const { facilities, isLoading: isLoadingFacilities } = useGetListFacilities();
  const { coupons, isLoading: isLoadingCoupons } = useGetListCoupons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nameFacilityOptions =
    facilities &&
    facilities?.map((item) => ({
      value: item?.id,
      label: item?.nameFacility,
    }));

  const optionCoupon =
    coupons &&
    coupons?.map((item) => ({
      value: item?.id,
      label: `${formatDate(item?.dayStart)} - ${formatDate(item?.dayEnd)} (${
        item?.percentCoupon
      }%)`,
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
    facilities: null,
    coupon: null,
    typeRoom: "",
    statusRoom: "",
    id: "",
    imageRooms: null,
    convenientNearArea: {
      distance: 0,
      name: "",
    },
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("convenientNearArea")) {
      const fieldName = name.split(".")[1];
      setDataRoomEdit((prevData) => ({
        ...prevData,
        convenientNearArea: {
          ...prevData.convenientNearArea,
          [fieldName]: value,
        },
      }));
    } else {
      setDataRoomEdit((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (value, name) => {
    setDataRoomEdit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          value: item?.id,
          label: item?.nameFacility,
        })),
      coupon: data?.coupon && {
        value: data?.coupon?.id,
        label: `${formatDate(data?.coupon?.dayStart)} - ${formatDate(
          data?.coupon?.dayEnd
        )} (${data?.coupon?.percentCoupon}%)`,
      },
      typeRoom: {
        value: data?.typeRoom?.id,
        label: data?.typeRoom?.name,
      },
      statusRoom: {
        value: data?.statusRoom,
        label: data?.statusRoom,
      },
      id: data?.id,
      convenientNearArea: {
        name: data?.convenientNearArea?.name,
        distance: data?.convenientNearArea?.distance,
      },
    });

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
    $updateRoom(
      {
        id: dataRoomEdit?.id,
        value: {
          ...dataRoomEdit,
          statusRoom: dataRoomEdit?.statusRoom?.value,
          typeRoom: dataRoomEdit.typeRoom.value,
          facilities: dataRoomEdit?.facilities?.map((item) => item?.value),
          coupon: dataRoomEdit?.coupon?.value,
        },
      },
      {
        onSuccess: () => {
          message.success("Update room successfully !");
        },
        onError: () => {
          message.error("Update room failure !");
        },
      }
    );
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <Modal
        title={`Update Room ${dataRoomEdit?.title}`}
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
              onChange={handleInputChange}
            />
            <Input
              value={dataRoomEdit.price}
              name="price"
              placeholder="price"
              onChange={handleInputChange}
            />
            <Input
              value={dataRoomEdit.numberPerson}
              name="numberPerson"
              placeholder="numberPerson"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <Input
              value={dataRoomEdit.stakeMoney}
              name="stakeMoney"
              placeholder="stakeMoney"
              onChange={handleInputChange}
            />
            <Input
              value={dataRoomEdit.district}
              name="district"
              placeholder="district"
              onChange={handleInputChange}
            />
            <Input
              value={dataRoomEdit.leaseTerm}
              name="leaseTerm"
              placeholder="leaseTerm"
              onChange={handleInputChange}
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
              onChange={(value) => handleSelectChange(value, "facilities")}
              options={nameFacilityOptions && nameFacilityOptions}
            />
            <Select
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              defaultValue={dataRoomEdit.coupon}
              onChange={(value) => handleSelectChange(value, "coupon")}
              options={optionCoupon && optionCoupon}
            />
          </div>
          <div className="flex gap-4">
            <Select
              mode="tags"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              defaultValue={dataRoomEdit.typeRoom}
              disabled={true}
            />
            <Select
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              disabled={true}
              defaultValue={dataRoomEdit.statusRoom}
              onChange={(value) => handleSelectChange(value, "statusRoom")}
              options={StatusRoomConstant && StatusRoomConstant}
            />
          </div>
          <Input
            value={dataRoomEdit.location}
            name="location"
            placeholder="location"
            onChange={handleInputChange}
          />
          <div className="flex gap-4">
            <div className="w-[70%]">
              <Input
                value={dataRoomEdit?.convenientNearArea?.name}
                name="convenientNearArea.name"
                placeholder="Name convenientNearArea"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-[30%]">
              <Input
                value={dataRoomEdit?.convenientNearArea?.distance}
                name="convenientNearArea.distance"
                placeholder="distance"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <TextArea
            value={dataRoomEdit.description}
            name="description"
            placeholder="description"
            autoSize={{ minRows: 4, maxRows: 6 }}
            onChange={handleInputChange}
          />
        </div>
      </Modal>
      <Table dataSource={listRoomData} columns={columns} />
    </div>
  );
};

export default TableListRoom;
