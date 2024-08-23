import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // URL server dummy kamu

const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

const register = (email: string, password: string, name: string) => {
  return axios.post(`${API_URL}/register`, { email, password, name });
};

export default {
  login,
  register,
};
