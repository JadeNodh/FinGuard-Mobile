import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const DashboardScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <View className="flex-1 items-center p-4">
      <Text className="text-2xl mb-4">Dashboard</Text>
      <View className="flex-row justify-around w-full mb-4">
        <View className="bg-white p-4 rounded-lg shadow-md items-center">
          <Text className="text-lg font-bold">Balance</Text>
          <Text className="text-xl">$1,234.56</Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-md items-center">
          <Text className="text-lg font-bold">Income</Text>
          <Text className="text-xl">$5,000.00</Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-md items-center">
          <Text className="text-lg font-bold">Expenses</Text>
          <Text className="text-xl">$3,765.44</Text>
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
    </View>
  );
};

export default DashboardScreen;
