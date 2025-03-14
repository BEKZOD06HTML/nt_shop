import React, { useState } from 'react';
import { Menu, Dropdown, Button, Avatar } from 'antd';
import { UserOutlined, SettingOutlined, LockOutlined, LogoutOutlined, PlusOutlined, DownOutlined, TeamOutlined } from '@ant-design/icons';
import './sidebar.css';

const Sidebar = () => {
  const [groupVisible, setGroupVisible] = useState(false);

  const profileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>My Account</Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>Settings</Menu.Item>
      <Menu.Item key="3" icon={<LockOutlined />}>Lock Screen</Menu.Item>
      <Menu.Item key="4" icon={<LogoutOutlined />}>Logout</Menu.Item>
    </Menu>
  );

  const groupMenu = (
    <Menu>
      <Menu.Item key="1" icon={<PlusOutlined />}>Add Group</Menu.Item>
    </Menu>
  );

  return (
    <div className='siderbar'>
      <h2 className='logo_1'>GRuops</h2>
      <Dropdown overlay={profileMenu} trigger={['click']}>
        <div className='profile-section'>
          <Avatar size={48} icon={<UserOutlined />} />
          <div className='profile-info'>
            <span>guest</span>
            <p>no name</p>
          </div>
          <DownOutlined />
        </div>
      </Dropdown>

      <div className='group-section'>
        <Button type='text' icon={<TeamOutlined />} onClick={() => setGroupVisible(!groupVisible)}>
          Groups
        </Button>
        {groupVisible && (
          <Dropdown overlay={groupMenu} trigger={['click']}>
            <Button type='primary' icon={<PlusOutlined />} className='add-group'>Add Group</Button>
          </Dropdown>
        )}
        <div className='no-data'>
          <p>No data</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;