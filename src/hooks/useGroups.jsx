import { useState, useEffect } from 'react';
import API from '../utils/API';

// Guruhlarni qidirish
const searchGroup = async (searchText) => {
  if (!searchText || searchText.length < 2) return [];
  const { data } = await API.get(`/groups/search?q=${searchText}`);
  return data;
};

// A'zolarni qidirish
const searchMember = async (searchText) => {
  if (!searchText || searchText.length < 2) return [];
  const { data } = await API.get(`/users/search?q=${searchText}`);
  return data;
};

const useGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await API.get('/auth/');
      setUser(response.data);
      fetchGroups(response.data.id);
    } catch (err) {
      setError('Foydalanuvchi ma’lumotlarini olishda xatolik!');
    }
  };

  const fetchGroups = async (userId) => {
    setLoading(true);
    try {
      const response = await API.get(`/groups?userId=${userId}`);
      setGroups(response.data);
    } catch (err) {
      setError('Guruhlarni olishda xatolik!');
    }
    setLoading(false);
  };

  // Yangi guruh yaratish
  const createGroup = async (name, password) => {
    setLoading(true);
    try {
      const response = await API.post('/groups/', { name, password });
      setGroups((prev) => [...prev, response.data]);
    } catch (err) {
      setError('Guruh yaratishda xatolik!');
    }
    setLoading(false);
  };

  // Guruhga qo‘shilish
  const joinGroup = async (groupId, password) => {
    try {
      const response = await API.post(`/groups/${groupId}/join`, { password });
      return response.data;
    } catch (err) {
      setError('Guruhga qo‘shilishda xatolik!');
    }
  };

  // Guruhga a’zo qo‘shish (foydalanuvchini qidirish orqali ID ni olish)
  const addMember = async (groupId, memberName) => {
    setLoading(true);
    setError('');

    try {
      // Foydalanuvchini ismi bo‘yicha qidirish
      const members = await searchMember(memberName);
      if (members.length === 0) {
        setError("Foydalanuvchi topilmadi!");
        setLoading(false);
        return null;
      }

      const memberId = members[0].id; // Birinchi topilgan foydalanuvchining ID sini olish
      console.log(`Topilgan foydalanuvchi ID: ${memberId}`);

      // Foydalanuvchini guruhga qo‘shish
      const response = await API.post(`/groups/${groupId}/members`, { memberId });
      console.log(`A'zo qo‘shildi:`, response.data);

      setLoading(false);
      return response.data;
    } catch (err) {
      console.error("Aʼzoni qoʻshishda xatolik:", err);
      setError('Aʼzoni qoʻshishda xatolik!');
      setLoading(false);
    }
  };

  return { groups, loading, error, createGroup, joinGroup, addMember };
};

export default useGroups;
