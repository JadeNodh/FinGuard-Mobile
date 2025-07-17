import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { TailwindProvider } from 'nativewind';

const App = () => {
  return (
    <TailwindProvider>
      <AppNavigator />
    </TailwindProvider>
  );
};

export default App;
