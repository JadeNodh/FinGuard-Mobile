import React, { useState } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const PremiumDashboardScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
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
      <View className="flex-row justify-around w-full mb-4">
        <Button title="Debt Calculator" onPress={() => navigation.navigate('DebtCalculator')} />
        <Button title="Export Reports" onPress={() => navigation.navigate('Reports')} />
      </View>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  );
};

export default PremiumDashboardScreen;
