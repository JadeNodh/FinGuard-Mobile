import React, { useState } from 'react';
import { View, Text, Button, Switch, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AiRecommendationsCard from '../components/AiRecommendationsCard';
import BudgetSimulator from '../components/BudgetSimulator';

const PremiumDashboardScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ScrollView>
      <View className={`flex-1 items-center p-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <Text className={`text-2xl mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Premium Dashboard 👑
        </Text>
        <View className="flex-row items-center mb-4">
          <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
        <Text className={`text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          You’ve saved LKR 12,000 this year
        </Text>
        <AiRecommendationsCard
          currentBudget={2000}
          projectedBudget={1800}
          savings={200}
        />
        <BudgetSimulator initialBudget={2000} />
        <View className="flex-row justify-around w-full mb-4 mt-4">
          <Button title="Debt Calculator" onPress={() => navigation.navigate('DebtCalculator')} />
          <Button title="Export Reports" onPress={() => navigation.navigate('Reports')} />
          <Button title="Family Management" onPress={() => navigation.navigate('FamilyManagement')} />
        </View>
        <Button title="Logout" onPress={() => auth().signOut()} />
      </View>
    </ScrollView>
  );
};

export default PremiumDashboardScreen;
