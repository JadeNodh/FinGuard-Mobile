import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Purchases from 'react-native-purchases';
import { subscribeToPremium } from '../services/api';

const API_KEY = Platform.select({
  ios: 'YOUR_IOS_API_KEY',
  android: 'YOUR_ANDROID_API_KEY',
});

const UpgradeScreen = () => {
  const navigation = useNavigation();
  const [offerings, setOfferings] = useState(null);

  useEffect(() => {
    if (API_KEY) {
      Purchases.configure({ apiKey: API_KEY });
      fetchOfferings();
    }
  }, []);

  const fetchOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        setOfferings(offerings.current);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpgrade = async () => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(offerings.availablePackages[0]);
      if (typeof customerInfo.entitlements.active['premium'] !== 'undefined') {
        await subscribeToPremium();
        alert('Upgraded to Premium!');
        navigation.goBack();
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.error(e);
      }
    }
  };

  return (
    <View className="flex-1 items-center p-4">
      <Text className="text-2xl mb-4">Upgrade to Premium</Text>
      <View className="mb-4">
        <Text className="text-lg font-bold">Free Plan</Text>
        <Text>- Add expenses and incomes</Text>
        <Text>- View graphs</Text>
      </View>
      <View className="mb-4">
        <Text className="text-lg font-bold">Premium Plan</Text>
        <Text>- Advanced Budgeting</Text>
        <Text>- Financial Reports</Text>
        <Text>- Debt Management</Text>
        <Text>- Exclusive UI</Text>
      </View>
      {offerings && <Button title="Upgrade Now" onPress={handleUpgrade} />}
    </View>
  );
};

export default UpgradeScreen;
