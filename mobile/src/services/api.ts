import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const addTransaction = async (transaction: {
  user_id: number;
  category_id: number;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  description: string;
}) => {
  const response = await axios.post(`${API_URL}/transactions`, transaction);
  return response.data;
};

export const getTransactions = async () => {
  const response = await axios.get(`${API_URL}/transactions`);
  return response.data;
};

export const getPremiumStatus = async () => {
  const response = await axios.get(`${API_URL}/premium`);
  return response.data;
};

export const subscribeToPremium = async () => {
  const response = await axios.post(`${API_URL}/premium/subscribe`);
  return response.data;
};

export const getAiRecommendations = async () => {
  const response = await axios.get(`${API_URL}/ai/recommendations`);
  return response.data;
};

export const getFamilyMembers = async () => {
  const response = await axios.get(`${API_URL}/family`);
  return response.data;
};

export const addFamilyMember = async (member: { name: string; email: string }) => {
  const response = await axios.post(`${API_URL}/family`, member);
  return response.data;
};
