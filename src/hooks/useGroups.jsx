import { useState, useEffect } from 'react';
import API from '../utils/API';

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
      setError('Foydalanuvchi maʼlumotlarini olishda xatolik!');
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

  return { groups, loading, error, createGroup };
};

export default useGroups;
