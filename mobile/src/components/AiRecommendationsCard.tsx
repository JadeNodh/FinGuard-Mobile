import React from 'react';
import { View, Text } from 'react-native';

const AiRecommendationsCard = ({ currentBudget, projectedBudget, savings }) => {
  return (
    <View className="p-4 mt-4 bg-blue-100 rounded-lg">
      <Text className="text-lg font-bold mb-2">AI Recommendations</Text>
      <View className="flex-row justify-between">
        <Text>Current Budget:</Text>
        <Text>${currentBudget}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text>Projected Budget:</Text>
        <Text>${projectedBudget}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text>Savings:</Text>
        <Text>${savings}</Text>
      </View>
    </View>
  );
};

export default AiRecommendationsCard;
