import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { UserComponent, RoleComponent } from '..';
import ListRooomComponent from '../room/ListRooomComponent';


const { SubMenu } = Menu;

const MenuNav = ({ onSelectComponent }) => {
  const [selectedKey, setSelectedKey] = useState(null);
  const handleClick = (e) => {
    setSelectedKey(e.key);
    switch (e.key) {
      case '1':
        onSelectComponent(<UserComponent />);
        break;
      case '2':
        onSelectComponent(<RoleComponent />);
        break;
      case '3':
        onSelectComponent(<ListRooomComponent />);
        break;
      default:
        onSelectComponent(null);
    }
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[selectedKey]}
      mode="inline"
    >
      <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="3">Option 5</Menu.Item>
        <Menu.Item key="4">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="5">Option 7</Menu.Item>
          <Menu.Item key="6">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="7">Option 9</Menu.Item>
        <Menu.Item key="8">Option 10</Menu.Item>
      </SubMenu>
    </Menu>
  );
};
export default MenuNav;