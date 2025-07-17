import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (email && password) {
      try {
        await auth().createUserWithEmailAndPassword(email, password);
        // Navigate to Dashboard
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-4">Signup</Text>
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
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignupScreen;
