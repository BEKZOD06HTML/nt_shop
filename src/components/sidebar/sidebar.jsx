import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Avatar, List } from 'antd';
import { UserOutlined, DownOutlined, PlusOutlined, TeamOutlined } from '@ant-design/icons';
import API from '../../utils/API';
import './sidebar.css';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');
  const [groupVisible, setGroupVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get('/auth/');
        setUser(response.data);
      } catch (err) {
        setError('Xatolik yuz berdi');
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await API.get('/groups/');
        setGroups(response.data);
      } catch (err) {
        console.error("Guruhlarni olishda xatolik", err);
      }
    };

    fetchUserData();
    fetchGroups();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className='sidebar'>
      <h2 className='logo_1'>Groups</h2>

      <Dropdown overlay={
        <Menu>
          <Menu.Item key="1" icon={<UserOutlined />}>My Account</Menu.Item>
        </Menu>
      } trigger={['click']}>
        <div className='profile-section'>
          <Avatar size={48} src={user?.avatar || '/default-avatar.png'} icon={!user?.avatar && <UserOutlined />} />
          <div className='profile-info'>
            <span>{user?.username || 'Guest'}</span>
            <p>{user?.name || 'No name'}</p>
          </div>
          <DownOutlined />
        </div>
      </Dropdown>

      <div className='group-section'>
        <Button type='text' icon={<TeamOutlined />} onClick={() => setGroupVisible(!groupVisible)}>
          Groups
        </Button>

        {groupVisible && (
          <List
            dataSource={groups}
            renderItem={group => (
              <List.Item>
                <span>{group.name}</span>
              </List.Item>
            )}
          />
        )}

        <Link to="/groups" className="add-group-btn">
          <Button type="primary" icon={<PlusOutlined />}>
            Yangi guruh qushish
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
