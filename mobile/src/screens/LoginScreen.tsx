import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email && password) {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        // Navigate to Dashboard
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-4">Login</Text>
      <TextInput
        className="w-full h-12 border rounded-lg px-4 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="w-full h-12 border rounded-lg px-4 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

export default LoginScreen;
