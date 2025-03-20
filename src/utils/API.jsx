// src/utils/API.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://nt-shopping-list.onrender.com/api',
});

// So'rovdan oldin token qo'shish
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  // Agar barcha so'rovlar JSON shaklida bo'lishi kerak bo'lsa:
  // req.headers['Content-Type'] = 'application/json';
  return req;
});

// Javobni qabul qilish va xatoliklarni tutish
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          console.error('400 (Bad Request):', data);
          alert('Xato so‘rov yoki noto‘g‘ri ma’lumot yuborildi!');
          break;
        case 401:
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 404:
          console.error('404 (Not Found):', data);
          alert('Topilmadi!');
          break;
        default:
          console.error(`Xatolik: ${status}`, data);
      }
    } else {
      console.error('Network yoki boshqa xatolik:', error.message);
    }
    throw error;
  }
);

export default API;
