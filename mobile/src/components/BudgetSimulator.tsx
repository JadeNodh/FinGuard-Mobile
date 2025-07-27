import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";

const BudgetSimulator = ({ initialBudget }) => {
  const screenWidth = Dimensions.get("window").width;
  const [budget, setBudget] = useState(initialBudget);

  const data = {
    labels: ['Current', 'Projected'],
    datasets: [
      {
        data: [initialBudget, budget],
      },
    ],
  };

  return (
    <View className="p-4 mt-4 bg-gray-100 rounded-lg">
      <Text className="text-lg font-bold mb-2">Budget Simulator</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={initialBudget * 2}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={budget}
        onValueChange={setBudget}
      />
      <Text>Adjusted Budget: ${budget.toFixed(2)}</Text>
      <BarChart
        data={data}
        width={screenWidth - 64}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff6ff',
          backgroundGradientTo: '#dbeafe',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export default BudgetSimulator;
