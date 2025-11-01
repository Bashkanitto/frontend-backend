import axios from 'axios';

// Создаём экземпляр axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

// Функции для работы с токеном
const token = {
  get: () => localStorage.getItem('token'),
  set: (value: string) => localStorage.setItem('token', value),
  remove: () => localStorage.removeItem('token'),
};

// Добавляем токен к каждому запросу
api.interceptors.request.use(
  (config) => {
    const accessToken = token.get();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Обрабатываем ответы
api.interceptors.response.use(
  (response) => {
    // Успешный ответ - просто возвращаем
    return response;
  },
  (error) => {
    // Обработка ошибок
    if (error.response?.status === 401) {
      // Токен истёк - очищаем и редиректим на логин
      token.remove();
      window.location.href = '/login';
    }

    // Для остальных ошибок - показываем сообщение
    const message = error.response?.data?.message || 'Что-то пошло не так';
    console.error('API Error:', message);

    return Promise.reject(error);
  }
);

export default api;
export { token };
