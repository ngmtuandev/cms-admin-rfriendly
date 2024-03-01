import React from "react";
import { useActiveUser } from "../../hooks/user/useActiveUser";
import { message } from "antd";

const SwitchCustom = ({ userStatus, userName, statusRoom }) => {
  console.log("statusRoom : ", statusRoom);
  const { mutate: $activeUser } = useActiveUser();
  const [messageApi, contextHolder] = message.useMessage();

  const handleActiveUser = () => {
    $activeUser(userName, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "active user succcess !",
        });
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "active user failure !",
        });
      },
    });
  };

  return (
    <div
      className={`w-[80px] h-[24px] rounded-2xl relative ${
        !userStatus ? "border-color-yellow-main" : "border-blue-400"
      } border-[1px] p-[2px] flex justify-between items-center`}
    >
      {contextHolder}
      {!userStatus ? (
        <div
          onClick={handleActiveUser}
          className="absolute flex justify-center items-center w-[44px] h-[20px] cursor-pointer rounded-2xl left-0 bg-color-yellow-main ml-[2px]"
        >
          <small className="text-[10px] font-semibold text-gray-50">
            Active
          </small>
        </div>
      ) : (
        <div
          onClick={handleActiveUser}
          className="absolute w-[44px] flex justify-center items-center h-[20px] cursor-pointer rounded-2xl right-0 bg-blue-400 mr-[2px]"
        >
          <small className="text-[10px] font-semibold text-gray-50">
            Inactive
          </small>
        </div>
      )}
    </div>
  );
};

export default SwitchCustom;
