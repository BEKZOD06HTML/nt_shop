import React, { useState } from 'react';
import { Button, Input, Modal, List } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined, UserAddOutlined } from '@ant-design/icons';
import { useGroups } from '../../hooks/useGroups';
import './groups.css';
 import Header from '../header/header'
 import Siderbar from '../sidebar/sidebar'

const Groups = () => {
  const {
    groups,
    groupsLoading,
    groupsError,
    selectedGroupId,
    setSelectedGroupId,
    groupMembers,
    membersLoading,
    searchText,
    setSearchText,
    searchedMembers,
    searchingMembers,
    createGroup,
    deleteGroup,
    addMember,
    removeMember,
  } = useGroups();

  // Yangi guruh yaratish uchun modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupPassword, setGroupPassword] = useState('');

  // A'zo qo'shish modali state
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('');

  // Yangi guruh yaratish funksiyasi
  const handleCreateGroup = () => {
    if (!groupName.trim() || !groupPassword.trim()) {
      return alert('Guruh nomi va parol bo‘sh bo‘lmasligi kerak!');
    }
    createGroup({ name: groupName, password: groupPassword });
    setGroupName('');
    setGroupPassword('');
    setCreateModalOpen(false);
  };

  // Guruhni o'chirish funksiyasi
  const handleDeleteGroup = (groupId) => {
    const confirmed = window.confirm('Haqiqatan ham ushbu guruhni o‘chirmoqchimisiz?');
    if (confirmed) {
      deleteGroup(groupId);
    }
  };

  // Guruh a'zolarini ko'rish
  const handleViewMembers = (groupId) => {
    setSelectedGroupId(groupId);
  };

  // A'zo qo'shish jarayoni
  const handleAddMember = () => {
    if (!selectedGroupId) {
      return alert('Guruh tanlanmagan!');
    }
    if (!selectedMemberId) {
      return alert('Foydalanuvchini tanlang!');
    }
    addMember({ groupId: selectedGroupId, memberId: selectedMemberId });
    setSelectedMemberId('');
    setSearchText('');
    setAddMemberModalOpen(false);
  };

  // A'zoni guruhdan chiqarish
  const handleRemoveMember = (memberId) => {
    if (!selectedGroupId) return;
    const confirmed = window.confirm('Rostdan ham ushbu aʼzoni guruhdan chiqarilsinmi?');
    if (confirmed) {
      removeMember({ groupId: selectedGroupId, memberId });
    }
  };

  return (
   <div>
    <Header/>
    <Siderbar/>
     <div className="groups-container">
      {/* CHAP TOMON - Guruhlar ro'yxati */}
      <div className="page1">
        <h2>Guruhlar</h2>
        {groupsError && <p style={{ color: 'red' }}>{groupsError}</p>}
        <div className="groups-header">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalOpen(true)}>
            Add Group
          </Button>
        </div>
        <List
          className="group-list"
          dataSource={groups}
          loading={groupsLoading}
          renderItem={(group) => (
            <List.Item className="group-item">
              <p><b>{group.name}</b></p>
              <Button icon={<EyeOutlined />} onClick={() => handleViewMembers(group._id)}>
                View Members
              </Button>
              <Button
                icon={<UserAddOutlined />}
                onClick={() => {
                  setSelectedMemberId('');
                  setSearchText('');
                  setAddMemberModalOpen(true);
                  setSelectedGroupId(group._id);
                }}
              >
                
              </Button>
              <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteGroup(group._id)}>
              
              </Button>
            </List.Item>
          )}
        />

        {/* Modal: Yangi guruh yaratish */}
        <Modal
          title="Yangi Guruh Yaratish"
          open={createModalOpen}
          onOk={handleCreateGroup}
          onCancel={() => setCreateModalOpen(false)}
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

        {/* Modal: A'zo qo'shish */}
        <Modal
          title="Guruhga a'zo qo'shish"
          open={addMemberModalOpen}
          onOk={handleAddMember}
          onCancel={() => {
            setAddMemberModalOpen(false);
            setSearchText('');
          }}
        >
          <Input
            placeholder="Username yoki ism"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <List
            dataSource={searchedMembers}
            loading={searchingMembers}
            renderItem={(user) => (
              <List.Item
                onClick={() => {
                  setSelectedMemberId(user._id);
                  setSearchText(user.username || user.name);
                }}
                style={{ cursor: 'pointer' }}
              >
                {user.name} ({user.username})
              </List.Item>
            )}
          />
        </Modal>
      </div>

      {/* O'NG TOMON - Tanlangan guruh a'zolari */}
      <div className="page2">
        <h2>A'zolar</h2>
        {membersLoading && <p>Loading members...</p>}
        {!membersLoading && groupMembers.length === 0 && <p>Bu guruhda hali a'zo yo'q.</p>}
        <List className='page2_list'
          dataSource={groupMembers}
          renderItem={(member) => (
            <List.Item className="group-item">
              <span>
              </span>
              <Button danger onClick={() => handleRemoveMember(member._id)}>
                Remove
              </Button>
            </List.Item>
          )}
        />
      </div>
    </div>
   </div>
  );
};

export default Groups;
