import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addTransaction } from '../services/api';
import auth from '@react-native-firebase/auth';

const AddTransactionScreen = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense'); // or 'income'
  const navigation = useNavigation();
  const user = auth().currentUser;

  const handleAddTransaction = async () => {
    if (amount && user) {
      try {
        await addTransaction({
          user_id: 1, // Replace with actual user ID
          category_id: 1, // Replace with actual category ID
          amount: parseFloat(amount),
          date: new Date().toISOString(),
          type,
          description,
        });
        Alert.alert('Success', 'Transaction added successfully');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Failed to add transaction');
      }
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl mb-4">Add Transaction</Text>
      <TextInput
        className="w-full h-12 border rounded-lg px-4 mb-4"
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        className="w-full h-12 border rounded-lg px-4 mb-4"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View className="flex-row justify-around mb-4">
        <Button title="Expense" onPress={() => setType('expense')} color={type === 'expense' ? 'blue' : 'gray'} />
        <Button title="Income" onPress={() => setType('income')} color={type === 'income' ? 'blue' : 'gray'} />
      </View>
      <Button title="Add Transaction" onPress={handleAddTransaction} />
    </View>
  );
};

export default AddTransactionScreen;
