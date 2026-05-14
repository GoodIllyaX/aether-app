import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppTabs } from './src/navigation/AppNavigator';
import { CharacterCreationStack } from './src/navigation/CharacterCreationStack';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={AppTabs} />
        
        <RootStack.Screen 
          name="CharacterCreation" 
          component={CharacterCreationStack} 
          options={{ gestureEnabled: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}