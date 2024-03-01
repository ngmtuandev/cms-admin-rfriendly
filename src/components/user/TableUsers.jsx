import React, { useState } from "react";
import { Space, Table, Tag, Modal } from "antd";
import { SwitchCustom } from "..";
import icons from "../../utils/icons";

const TableUsers = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { FaUserEdit } = icons;

  const showModal = (userStatus) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Status",
      dataIndex: "userStatus",
      key: "userStatus",
      render: (userStatus) => (
        <Tag color={userStatus ? "#FFB40C" : "red"}>
          {userStatus ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "listRoles",
      render: (listRoles) => (
        <>
          {listRoles.map((role) => (
            <Tag color="#FFB40C" key={role.id}>
              {role.roleName}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Action",
      key: "action",
      render: (userStatus) => {
        return (
          <Space size="middle">
            <SwitchCustom
              userName={userStatus?.userName}
              userStatus={!userStatus?.userStatus}
            ></SwitchCustom>
            <FaUserEdit
              onClick={() => showModal(userStatus)}
              className="cursor-pointer hover:bg-opacity-75"
              size={25}
              color="#FFB40C"
            ></FaUserEdit>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Table columns={columns} dataSource={userData} />
    </div>
  );
};

export default TableUsers;
