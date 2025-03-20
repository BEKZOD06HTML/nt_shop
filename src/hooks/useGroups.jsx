import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../utils/API';

// Foydalanuvchini qidirish
const searchMember = async (searchText) => {
  if (!searchText || searchText.length < 2) return [];
  const { data } = await API.get(`/users/search?q=${searchText}`);
  return data; // [ { _id, name, username }, ... ]
};

// Guruhlar ro'yxatini olish
const fetchGroups = async () => {
  const { data } = await API.get('/groups');
  return data; // [ { _id, name, owner, members, ... }, ... ]
};

// Yangi guruh yaratish
const createGroupFn = async ({ name, password }) => {
  const { data } = await API.post('/groups', { name, password });
  return data;
};

// Guruhni o'chirish
const deleteGroupFn = async (groupId) => {
  await API.delete(`/groups/${groupId}`);
  return groupId;
};

// Tanlangan guruh a'zolarini olish
const fetchGroupMembersFn = async (groupId) => {
  const { data } = await API.get(`/groups/${groupId}/members`);
  return data; // [ { _id, name, username }, ... ]
};

// Guruhga a'zo qo'shish
const addMemberFn = async ({ groupId, memberId }) => {
  const { data } = await API.post(`/groups/${groupId}/members`, { memberId });
  return data;
};

// Guruhdan a'zoni o'chirish
const removeMemberFn = async ({ groupId, memberId }) => {
  await API.delete(`/groups/${groupId}/members/${memberId}`);
  return { groupId, memberId };
};

export const useGroups = () => {
  const queryClient = useQueryClient();

  // Guruhlar ro'yxati
  const {
    data: groups = [],
    isLoading: groupsLoading,
    isError: groupsError,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
  });

  // Tanlangan guruh a'zolarini saqlash uchun state
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // Tanlangan guruh a'zolarini olish
  const {
    data: groupMembers = [],
    isLoading: membersLoading,
  } = useQuery({
    queryKey: ['groupMembers', selectedGroupId],
    queryFn: () => fetchGroupMembersFn(selectedGroupId),
    enabled: !!selectedGroupId,
  });

  // Yangi guruh yaratish mutatsiyasi
  const createGroupMutation = useMutation({
    mutationFn: createGroupFn,
    onSuccess: (newGroup) => {
      queryClient.setQueryData(['groups'], (old = []) => [...old, newGroup]);
    },
  });

  // Guruhni o'chirish mutatsiyasi
  const deleteGroupMutation = useMutation({
    mutationFn: deleteGroupFn,
    onSuccess: (deletedGroupId) => {
      queryClient.setQueryData(['groups'], (old = []) =>
        old.filter((g) => g._id !== deletedGroupId)
      );
    },
  });

  // A'zo qo'shish mutatsiyasi
  const addMemberMutation = useMutation({
    mutationFn: addMemberFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['groupMembers', selectedGroupId]);
    },
  });

  // A'zoni o'chirish mutatsiyasi
  const removeMemberMutation = useMutation({
    mutationFn: removeMemberFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['groupMembers', selectedGroupId]);
    },
  });

  // Foydalanuvchini qidirish uchun state va query
  const [searchText, setSearchText] = useState('');
  const {
    data: searchedMembers = [],
    isLoading: searchingMembers,
  } = useQuery({
    queryKey: ['searchMembers', searchText],
    queryFn: () => searchMember(searchText),
    enabled: searchText.length > 1,
  });

  return {
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
    createGroup: createGroupMutation.mutate,
    deleteGroup: deleteGroupMutation.mutate,
    addMember: addMemberMutation.mutate,
    removeMember: removeMemberMutation.mutate,
  };
};
