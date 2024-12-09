import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const api = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password
    });
    return response.data;
  },

  async register(name: string, email: string, password: string) {
    const response = await axios.post(`${API_URL}/user/signup`, {
      name,
      email,
      password
    });
    return response.data;
  },

  async sendMessage(userId: string, message: string) {
    const response = await axios.post(`${API_URL}/chat/send`, {
      userId,
      message
    });
    return response.data;
  },

  async getChatHistory(userId: string) {
    const response = await axios.get(`${API_URL}/chat/history/${userId}`);
    return response.data;
  },

  async clearChatHistory(userId: string) {
    const response = await axios.delete(`${API_URL}/chat/clear/${userId}`);
    return response.data;
  }
};