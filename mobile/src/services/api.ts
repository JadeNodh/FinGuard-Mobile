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
