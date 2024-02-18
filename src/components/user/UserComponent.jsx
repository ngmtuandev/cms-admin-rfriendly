import React, { useState } from 'react'
import { ButtonBase, TableUsers } from '..'
import { useGetListUsers } from '../../hooks/user/useListUsers'
import { useGetAllRoles } from '../../hooks/role/useGetAllRoles';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Select, message, Modal, Input, Tooltip } from 'antd';
import { useRegisterUser } from '../../hooks/user/useRegisterUser';
const UserComponent = () => {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [infoRegister, setInfoRegister] = useState({
    userName: '',
    password: '',
    email: '',
    listRoles: ['']
  })
  const [, setModalText] = useState('Content of the modal');
  const [messageApi, ] = message.useMessage();

  const { users } = useGetListUsers();
  const { roles } = useGetAllRoles();

  const { mutate : $register } = useRegisterUser();

  const options = [];
  for (let i = 0; i < roles?.data?.length; i++) {
    options.push({
      label: roles?.data[i]?.roleName,
      value: roles?.data[i]?.roleName.replace("ROLE_", "").toLowerCase(),
    });
  }
  const handleChange = (value) => {
    setInfoRegister(prevState => ({
      ...prevState,
      listRoles: [...prevState.listRoles, value]
    }));
  };
  
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    try {
      $register({...infoRegister, listRoles: infoRegister.listRoles[infoRegister.listRoles.length-1]}, {
        onSuccess: () => {
          messageApi.open({
            type: 'success',
            content: 'Add user successfully !',
          });
        },
        onError: () => {
          console.log('error')
        },
        onSettled: () => {
          setEmailResetPassword('')
        }
      })
    } catch (error) {
      messageApi.open({
        type: 'success',
        content: 'Add user successfully !',
      });
    }
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfoRegister(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  return (
    <div className='px-main'>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        okButtonProps={{ style: {background: '#FFB40C'} }}
        onCancel={handleCancel}
      >
        <div className='flex flex-col gap-4'>
          <Input
            value={infoRegister.userName}
            name='userName'
            onChange={handleChangeInput}
            placeholder="Enter your username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />
          <Input.Password
            onChange={handleChangeInput}
            name='password'
            placeholder="input password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <Input 
          onChange={handleChangeInput}
          name='email' placeholder="Email" />
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select"
            onChange={handleChange}
            options={options}
          />
        </div>
      </Modal>
      <div className='w-1/6' onClick={showModal}>
        <ButtonBase text='Add user'></ButtonBase>
      </div>
      <div className='mt-5'>
        <TableUsers userData={users?.data}></TableUsers>
      </div>
    </div>
  )
}

export default UserComponent
