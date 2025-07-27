import React from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaywallModal = ({ visible, onClose }) => {
  const navigation = useNavigation();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-8 rounded-lg items-center">
          <Text className="text-xl mb-4">Upgrade to Premium</Text>
          <Text className="text-center mb-4">
            This feature is only available for premium users.
          </Text>
          <Button
            title="Upgrade Now"
            onPress={() => {
              onClose();
              navigation.navigate('Upgrade');
            }}
          />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default PaywallModal;
