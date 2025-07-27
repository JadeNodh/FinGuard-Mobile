import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './AuthNavigator';
import DashboardScreen from '../screens/DashboardScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import UpgradeScreen from '../screens/UpgradeScreen';
import PremiumDashboardScreen from '../screens/PremiumDashboardScreen';
import DebtCalculatorScreen from '../screens/DebtCalculatorScreen';
import ReportsScreen from '../screens/ReportsScreen';
import FamilyManagementScreen from '../screens/FamilyManagementScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getPremiumStatus } from '../services/api';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isPremium, setIsPremium] = useState(false);

  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      checkPremiumStatus();
    }
    if (initializing) setInitializing(false);
  }

  const checkPremiumStatus = async () => {
    const premiumStatus = await getPremiumStatus();
    setIsPremium(premiumStatus.isActive);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          isPremium ? (
            <>
              <Stack.Screen name="PremiumDashboard" component={PremiumDashboardScreen} />
              <Stack.Screen name="DebtCalculator" component={DebtCalculatorScreen} />
              <Stack.Screen name="Reports" component={ReportsScreen} />
              <Stack.Screen name="FamilyManagement" component={FamilyManagementScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
              <Stack.Screen name="Upgrade" component={UpgradeScreen} />
            </>
          )
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
