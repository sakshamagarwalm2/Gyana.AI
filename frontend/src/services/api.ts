import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const api = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password
    });
    // console.log(response)
    return response.data;
  },

  async register(name: string, email: string, password: string) {
    const response = await axios.post(`${API_URL}/user/signup`, {
      name,
      email,
      password
    });
    // console.log(response)
    return response.data;
  },

  async sendMessage(userId: string, message: string) {
    console.log("api : "+ message, userId);
    const response = await axios.post(`${API_URL}/chat/new`, {
      userId,
      message
    });
    console.log("api : "+response,response.data)
    return response.data;
  },

  async getChatHistory(userId: string) {
    // console.log(userId);
    console.log("chathistory api : "+userId);

    const response = await axios.get(`${API_URL}/chat/allchats`);

    console.log(response)

    return response.data;
  },

  async clearChatHistory(userId: string) {
    console.log("delete api : "+userId)
    const response = await axios.delete(`${API_URL}/chat/delete`);
    console.log("delete api : "+response,response.data)
    return response.data;
  }
};