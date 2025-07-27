import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getTransactions } from '../services/api';
import { CsvGenerator } from 'react-native-csv';

const ReportsScreen = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  const exportCsv = () => {
    const headers = ['Date', 'Description', 'Type', 'Amount'];
    const data = transactions.map((t) => [
      new Date(t.date).toLocaleDateString(),
      t.description,
      t.type,
      t.amount,
    ]);

    const csv = new CsvGenerator(data, headers);
    // TODO: Use react-native-fs to save the file
    alert('CSV Generated!');
  };

  return (
    <View className="flex-1 items-center p-4">
      <Text className="text-2xl mb-4">Financial Reports</Text>
      <Button title="Export as CSV" onPress={exportCsv} />
    </View>
  );
};

export default ReportsScreen;
