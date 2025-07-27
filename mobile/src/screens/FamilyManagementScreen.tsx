import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import { getFamilyMembers, addFamilyMember } from '../services/api';

const FamilyManagementScreen = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const fetchFamilyMembers = async () => {
    const data = await getFamilyMembers();
    setMembers(data);
  };

  const handleAddMember = async () => {
    if (name && email) {
      await addFamilyMember({ name, email });
      fetchFamilyMembers();
      setName('');
      setEmail('');
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl mb-4">Family Management</Text>
      <TextInput
        className="w-full h-12 border rounded-lg px-4 mb-4"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="w-full h-12 border rounded-lg px-4 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Add Member" onPress={handleAddMember} />
      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 mt-4 bg-gray-100 rounded-lg">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FamilyManagementScreen;
