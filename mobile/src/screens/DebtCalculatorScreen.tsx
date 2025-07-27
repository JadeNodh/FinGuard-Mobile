import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const DebtCalculatorScreen = () => {
  const [debtAmount, setDebtAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [result, setResult] = useState(null);

  const calculateDebtPayoff = (isAvalanche) => {
    // Simplified calculation logic
    const principal = parseFloat(debtAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);

    if (principal > 0 && rate > 0 && payment > 0) {
      if (payment <= principal * rate) {
        setResult('Monthly payment is too low to cover interest.');
        return;
      }
      let months = 0;
      let remainingDebt = principal;
      while (remainingDebt > 0) {
        remainingDebt = remainingDebt * (1 + rate) - payment;
        months++;
      }
      setResult(`It will take ${months} months to pay off your debt.`);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl mb-4">Debt Calculator</Text>
      <TextInput
        className="w-full h-12 border rounded-lg px-4 mb-4"
        placeholder="Debt Amount"
        value={debtAmount}
        onChangeText={setDebtAmount}
        keyboardType="numeric"
      />
      <TextInput
        className="w-full h-12 border rounded-lg px-4 mb-4"
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
      />
      <TextInput
        className="w-full h-12 border rounded-lg px-4 mb-4"
        placeholder="Monthly Payment"
        value={monthlyPayment}
        onChangeText={setMonthlyPayment}
        keyboardType="numeric"
      />
      <View className="flex-row justify-around mb-4">
        <Button title="Snowball" onPress={() => calculateDebtPayoff(false)} />
        <Button title="Avalanche" onPress={() => calculateDebtPayoff(true)} />
      </View>
      {result && <Text className="text-lg">{result}</Text>}
    </View>
  );
};

export default DebtCalculatorScreen;
