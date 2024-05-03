import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StackNavigator } from './src/presentation/navigation/StackNavigator';
import { PermissionsChecker } from './src/presentation/providers/PermissionsChecker';

export const App = () => {
 
  return (
    <NavigationContainer>
      <PermissionsChecker>
        <StackNavigator />
      </PermissionsChecker>
    </NavigationContainer>
  );
}


export default App;
