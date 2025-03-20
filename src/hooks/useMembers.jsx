import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../utils/API';
import { useState } from 'react';

const searchMembers = async (searchText) => {
  if (!searchText || searchText.length < 3) return [];
  const { data } = await API.get(`/users/search?q=${encodeURIComponent(searchText)}`);
  return data;
};

export const useMembers = (searchText) => {
  const { 
    data: members = [], 
    isLoading: membersLoading, 
    error: membersError 
  } = useQuery({
    queryKey: ['searchMembers', searchText],
    queryFn: () => searchMembers(searchText),
    enabled: !!searchText && searchText.length > 2,
  });

  return { members, membersLoading, membersError };
};

const removeMember = async ({ groupId, memberId }) => {
  if (!groupId || !memberId) throw new Error('Invalid group or member ID');
  const { data } = await API.delete(`/groups/${groupId}/members/${memberId}`);
  return data;
};

export const useRemoveMember = (groupId) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ memberId }) => removeMember({ groupId, memberId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['groupMembers', groupId]);
    },
    onError: (error) => {
      console.error('Error removing member:', error);
    },
  });
};

const useManageMembers = (groupId) => {
  const [searchText, setSearchText] = useState('');
  const { members, membersLoading } = useMembers(searchText);
  const removeMemberMutation = useRemoveMember(groupId);

  return { searchText, setSearchText, members, membersLoading, removeMemberMutation };
};

export default useManageMembers;
