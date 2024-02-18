import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo/logo.png'
import { doGetProfile } from '../../store/slices/userSlice'
import withHocBase from '../../hocs/withHocBase'
import { useAppSelector } from '../../hooks/redux/reduxHook'
import path from '../../utils/paths'
import { Avatar, Popover, Modal, Drawer, Button, Space } from 'antd'
import icons from '../../utils/icons'
import { MenuNav } from '../index'
const Header = ({dispatch, navigate, onSelectComponent}) => {

  const user = useAppSelector((state) => state.user.info);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const tokenUser = localStorage.getItem('token-user');

  const { AiOutlineMenu } = icons;

  useEffect(() => {
    if (tokenUser) dispatch(doGetProfile());
    else navigate(path.LOGIN);
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    localStorage.clear();
    navigate(path.LOGIN);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex shadow-sm justify-between items-center w-full px-main'>
      <Modal open={isModalOpen} onOk={handleOk} 
      okButtonProps={{ style: {background: '#FFB40C'} }} onCancel={handleCancel}>
        <p>Bạn có muốn đăng xuất không ?</p>
      </Modal>
      <Drawer
        title={
          <div>
            <img className='w-4/12' src={logo}></img>
          </div>
        }
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        closeIcon={null}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button style={{ backgroundColor: '#FFB40C' }} type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <MenuNav onSelectComponent={onSelectComponent}></MenuNav>
      </Drawer>
      <div>
        <img className='w-1/5' src={logo}></img>
      </div>
      <div className='flex items-center gap-6'>
        <div className='cursor-pointer' onClick={showDrawer}>
          <AiOutlineMenu size={24} color='gray' />
        </div>
        <Popover placement="bottomLeft" content={
          <div>
            <div>Nội dung 1</div>
            <div>Nội dung 1</div>
            <div>Nội dung 1</div>
            <div className='cursor-pointer' onClick={showModal}>Đăng xuất</div>
          </div>
        } title={user?.userName}>
          <div>
          <Avatar style={{ verticalAlign: 'middle', backgroundColor: '#FFB40C', fontSize: 20 }} size="large">
            {user?.userName?.slice(0,1).toUpperCase()}
          </Avatar>
          </div>
        </Popover>
      </div>
    </div>
  )
}

export default withHocBase(Header)
