import React, { useState } from 'react';
import useGroups from '../../hooks/useGroups';
import { Button, Input, Modal, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './groups.css';

const Groups = () => {
  const { groups, loading, error, createGroup } = useGroups();
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupPassword, setGroupPassword] = useState('');

  const handleCreateGroup = () => {
    if (!groupName.trim() || !groupPassword.trim()) {
      return;
    }
    createGroup(groupName, groupPassword);
    setGroupName('');
    setGroupPassword('');
    setModalVisible(false);
  };

  return (
    <div className="groups-container">
      <h2>Guruhlar</h2>
      {error && <p className="error">{error}</p>}
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => setModalVisible(true)}
      >
        Add Group
      </Button>

      <List
        className="group-list"
        dataSource={groups}
        renderItem={(group) => (
          <List.Item className="group-item">
            {group.name}
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
    </div>
  );
};

export default Groups;
