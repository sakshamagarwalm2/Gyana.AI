import axios from 'axios';

const API_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1`;

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
    // console.log("api : "+ message, userId);
    const response = await axios.post(`${API_URL}/chat/new`, {
      userId,
      message
    });
    // console.log("api : "+response,response.data)
    return response.data;
  },

  async getChatHistory(userId: string) {
    // console.log(userId);
    // console.log("chathistory api : "+userId);

    const response = await axios.post(`${API_URL}/chat/allchats`,{
      userId
    });

    // console.log("chathis: "+response)

    return response.data;
  },

  async clearChatHistory(userId: string) {
    const response = await axios.post(`${API_URL}/chat/delete`,{
      userId
    });
    return response.data;
  }
};