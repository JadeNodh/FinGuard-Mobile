import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getAiRecommendations } from '../services/api';

const AiRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const data = await getAiRecommendations();
    setRecommendations(data);
  };

  return (
    <View className="p-4 mt-4 bg-blue-100 rounded-lg">
      <Text className="text-lg font-bold mb-2">AI Budget Recommendations</Text>
      {recommendations.map((rec, index) => (
        <Text key={index} className="mb-1">
          - {rec.suggestion}
        </Text>
      ))}
    </View>
  );
};

export default AiRecommendations;
