import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getTransactions } from '../services/api';

const DashboardScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    if (isFocused) {
      fetchTransactions();
    }
  }, [isFocused]);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
      updateDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDashboard = (data) => {
    const incomeData = data.filter((t) => t.type === 'income');
    const expenseData = data.filter((t) => t.type === 'expense');

    const totalIncome = incomeData.reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = expenseData.reduce((acc, t) => acc + t.amount, 0);

    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setBalance(totalIncome - totalExpenses);

    const labels = data.map((t) => new Date(t.date).toLocaleDateString());
    const chartValues = data.map((t) => t.amount);
    setChartData({
      labels,
      datasets: [{ data: chartValues }],
    });
  };

  return (
    <View className="flex-1 items-center p-4">
      <Text className="text-2xl mb-4">Dashboard</Text>
      <View className="flex-row justify-around w-full mb-4">
        <View className="bg-white p-4 rounded-lg shadow-md items-center">
          <Text className="text-lg font-bold">Balance</Text>
          <Text className="text-xl">${balance.toFixed(2)}</Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-md items-center">
          <Text className="text-lg font-bold">Income</Text>
          <Text className="text-xl">${income.toFixed(2)}</Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-md items-center">
          <Text className="text-lg font-bold">Expenses</Text>
          <Text className="text-xl">${expenses.toFixed(2)}</Text>
        </View>
      </View>
      <Text className="text-xl mb-2">Spending Trend</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Button title="Logout" onPress={() => auth().signOut()} />
      <Button title="Add Transaction" onPress={() => navigation.navigate('AddTransaction')} />
    </View>
  );
};

export default DashboardScreen;
