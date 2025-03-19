  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import useGroups from '../../hooks/useGroups';
  import { Button, Input, Modal, List } from 'antd';
  import { PlusOutlined, UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
  import './groups.css';
  import Header from '../../components/header/header'
  import Siderbar from '../../components/sidebar/sidebar'
  const Groups = () => {
    const navigate = useNavigate();
    const { groups, loading, error, createGroup, joinGroup, addMember } = useGroups();
    const [modalVisible, setModalVisible] = useState(false);
    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupPassword, setGroupPassword] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [memberId, setMemberId] = useState('');
    const [joinPassword, setJoinPassword] = useState('');


    const handleCreateGroup = () => {
      if (!groupName.trim() || !groupPassword.trim()) {
        return;
      }
      createGroup(groupName, groupPassword);
      setGroupName('');
      setGroupPassword('');
      setModalVisible(false);
    };

    const handleJoinGroup = async () => {
      if (!selectedGroupId || !joinPassword.trim()) return;
      const result = await joinGroup(selectedGroupId, joinPassword);
      if (result) {
        alert('Guruhga muvaffaqiyatli qo‘shildingiz!');
      }
      setJoinPassword('');
      setJoinModalVisible(false);
    };
    const handleAddMember = async () => {
      if (!selectedGroupId || !memberId.trim()) return;
      const result = await addMember(selectedGroupId, memberId);
      if (result) {
        alert('Foydalanuvchi guruhga qo‘shildi!');
      }
      setMemberId('');
      setAddMemberModalVisible(false);
    };

    return (
    <div>
      <Header/>
      <Siderbar/>
      <div className="groups-container">
      <div className='page1'>
      <h2>Guruhlar</h2>
        {error && <p className="error">{error}</p>}

        <div className="groups-header">
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => setModalVisible(true)}
          >
            Add Group
          </Button>

          <Button 
            type="default" 
            icon={<UserOutlined />} 
            onClick={() => navigate('/profile')}
          >
            Profile
          </Button>
        </div>

        <List
          className="group-list"
          dataSource={groups}
          renderItem={(group) => (
            <List.Item className="group-item">
              <span>{group.name}</span>
              <Button 
                icon={<LoginOutlined />} 
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setJoinModalVisible(true);
                }}
              >
                Join
              </Button>
              <Button 
                icon={<UserAddOutlined />} 
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setAddMemberModalVisible(true);
                }}
              >
                Add Member
              </Button>
            </List.Item>
          )}
          loading={loading}
        />

  
        <Modal
          title="Yangi Guruh Yaratish"
          open={modalVisible}
          onOk={handleCreateGroup}
          onCancel={() => setModalVisible(false)}
        >
          <Input
            placeholder="Guruh nomi"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Input.Password
            placeholder="Parol"
            value={groupPassword}
            onChange={(e) => setGroupPassword(e.target.value)}
          />
        </Modal>

        <Modal
          title="Guruhga qo‘shilish"
          open={joinModalVisible}
          onOk={handleJoinGroup}
          onCancel={() => setJoinModalVisible(false)}
        >
          <Input.Password
            placeholder="Guruh parolini kiriting"
            value={joinPassword}
            onChange={(e) => setJoinPassword(e.target.value)}
          />
        </Modal>
        <Modal
          title="Guruhga a’zo qo‘shish"
          open={addMemberModalVisible}
          onOk={handleAddMember}
          onCancel={() => setAddMemberModalVisible(false)}
        >
          <Input
            placeholder="Foydalanuvchi ID sini kiriting"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
        </Modal>
      </div>
      <div className='page2'>
          
      </div>
      </div>
    </div>
      
    );
  };

  export default Groups;
