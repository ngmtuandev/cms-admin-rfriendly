import React, { useState } from "react";
import TableListRoom from "./TableListRoom";
import { useGetListRooms } from "../../hooks/room/useListRooms";
import { ButtonBase } from "..";
import { Steps, Select, message, Modal, Input, Upload } from "antd";
import { useGetListFacilities } from "../../hooks/facilities/useGetListFacilities";
import { useGetListCoupons } from "../../hooks/coupon/useGetListCoupon";
import { useGetListTypeRooms } from "../../hooks/type_room/useGetListTypeRoom";
import { useGetListTypeImage } from "../../hooks/type_image/useGetListTypeImage";
import formatDate from "../../helper/formatDate";
import { StatusRoomConstant } from "../../constants/StatusRoomConstant";
import { useCreateNewRoom } from "../../hooks/room/useCreateRoom";
import { PlusOutlined } from "@ant-design/icons";
import withHocBase from "../../hocs/withHocBase";
import { addIdRoomNew } from "../../store/slices/roomSlice";
import { useAppSelector } from "../../hooks/redux/reduxHook";
import { useCreateImageForRoom } from "../../hooks/image_room/useCreateImageForRoom";
import { SuccessSvg } from "../../assets/svg/index";

const ListRooomComponent = ({ dispatch }) => {
  const { rooms } = useGetListRooms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stepState, setStepState] = useState(0);
  const [selectedValueTypeImage, setSelectedValueTypeImage] = useState(null);

  const { facilities, isLoading: isLoadingFacilities } = useGetListFacilities();
  const { coupons, isLoading: isLoadingCoupons } = useGetListCoupons();
  const { typeRoom, isLoading: isLoadingTypeRoom } = useGetListTypeRooms();
  const { typeImage, isLoading: isLoadingTypeImage } = useGetListTypeImage();

  const idRoomNew = useAppSelector((state) => state.room.idRoomNew);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState([]);

  const { mutate: $createRoom } = useCreateNewRoom();
  const { mutate: $createImageForRoom } = useCreateImageForRoom();

  const [dataRoomEdit, setDataRoomEdit] = useState({
    price: 0,
    numberPerson: 0,
    description: "",
    title: "",
    stakeMoney: 0,
    location: "",
    district: "",
    leaseTerm: 0,
    imageRooms: null,
    facilities: null,
    coupon: null,
    typeRoom: "",
    statusRoom: "",
    id: "",
    convenientNearArea: {
      distance: 0,
      name: "",
    },
  });

  const { TextArea } = Input;

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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

  const optionTypeImage =
    typeImage &&
    typeImage?.map((item) => ({
      value: item?.id,
      label: item?.name,
    }));

  const optionTypeRooms =
    typeRoom &&
    typeRoom?.map((item) => ({
      value: item?.id,
      label: item?.name,
    }));

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (+stepState === 0) {
      $createRoom(dataRoomEdit, {
        onSuccess: (response) => {
          dispatch(addIdRoomNew(response?.data));
          message.success("Create a new room successfully !");
          setStepState(stepState + 1);
        },
        onError: () => {
          message.error("Create a new room failure !");
        },
      });
    }
    if (+stepState === 1) {
      setStepState(stepState + 1);
    }
    if (+stepState === 2) {
      setIsModalOpen(false);
      setStepState(0);
      setDataRoomEdit({
        price: 0,
        numberPerson: 0,
        description: "",
        title: "",
        stakeMoney: 0,
        location: "",
        district: "",
        leaseTerm: 0,
        imageRooms: null,
        facilities: null,
        coupon: null,
        typeRoom: "",
        statusRoom: "",
        id: "",
        convenientNearArea: {
          distance: 0,
          name: "",
        },
      });
    }
  };

  const handleCancelModel = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleUpload = async () => {
    if (!fileList.length) {
      message.error("Please select at least one image to upload");
      return;
    }

    const formData = new FormData();
    for (const file of fileList) {
      formData.append("files", file.originFileObj);
    }

    try {
      $createImageForRoom(
        {
          idRoom: idRoomNew,
          idTypeImage: selectedValueTypeImage,
          images: formData,
        },
        {
          onSuccess: () => {
            message.success("Create a new image room successfully !");
          },
          onError: () => {
            message.error("Create a new image room failure !");
          },
        }
      );

      message.success("Images uploaded successfully!");
      setFileList([]);
    } catch (error) {
      message.error("Failed to upload images. Please try again.");
    }
  };

  return (
    <div className="px-main my-6 w-[100%]">
      <Modal
        title={`Create New Room ${dataRoomEdit?.title}`}
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ style: { background: "#FFB40C" } }}
        onCancel={handleCancelModel}
        width={800}
        okText={
          stepState === 0
            ? "Thêm phòng"
            : stepState === 1
            ? "Thêm ảnh"
            : "Hoàn thành"
        }
      >
        <div className="my-3">
          <Steps
            size="small"
            current={stepState}
            items={[
              {
                title: "Thông tin phòng",
              },
              {
                title: "Ảnh của phòng",
              },
              {
                title: "Thành công",
              },
            ]}
          />
        </div>
        {+stepState === 0 ? (
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
                type="Number"
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
                onChange={(value) => handleSelectChange(value, "facilities")}
                options={nameFacilityOptions && nameFacilityOptions}
              />
              <Select
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                onChange={(value) => handleSelectChange(value, "coupon")}
                options={optionCoupon && optionCoupon}
              />
            </div>
            <div className="flex gap-4">
              <Select
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                options={optionTypeRooms && optionTypeRooms}
                onChange={(value) => handleSelectChange(value, "typeRoom")}
              />
              <Select
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                onChange={(value) => handleSelectChange(value, "statusRoom")}
                options={StatusRoomConstant && StatusRoomConstant}
              />
            </div>
            <Input
              name="location"
              placeholder="location"
              onChange={handleInputChange}
            />
            <div className="flex gap-4">
              <div className="w-[70%]">
                <Input
                  name="convenientNearArea.name"
                  placeholder="Name convenientNearArea"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-[30%]">
                <Input
                  name="convenientNearArea.distance"
                  placeholder="distance"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <TextArea
              name="description"
              placeholder="description"
              autoSize={{ minRows: 4, maxRows: 6 }}
              onChange={handleInputChange}
            />
          </div>
        ) : +stepState === 1 ? (
          <div>
            <div className="mb-6 pb-[8px] border-b-[1px] border-gray-300">
              <div className=" flex w-[30%] flex-col">
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onChange={(value) => setSelectedValueTypeImage(value)}
                  options={optionTypeImage && optionTypeImage}
                />
                <div onClick={handleUpload}>
                  <ButtonBase text={"Upload Image"}></ButtonBase>
                </div>
              </div>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </div>
        ) : (
          <div className="w-[100%] justify-center flex my-10">
            <SuccessSvg></SuccessSvg>
          </div>
        )}
      </Modal>
      <div className="w-1/6" onClick={showModal}>
        <ButtonBase text="Add room"></ButtonBase>
      </div>
      <TableListRoom listRoomData={rooms?.data}></TableListRoom>
    </div>
  );
};

export default withHocBase(ListRooomComponent);
