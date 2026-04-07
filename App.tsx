import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChooseClassScreen from './src/features/character-creation/ChooseClassScreen';
import ClassDetailsScreen from './src/features/character-creation/ClassDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="ChooseClass"
        screenOptions={{
          headerStyle: { backgroundColor: '#0E0915' },
          headerTintColor: 'gold',
        }}
      >
        
        <Stack.Screen 
          name="ChooseClass" 
          component={ChooseClassScreen} 
          options={{ title: 'Choose Class' }}
        />

        <Stack.Screen 
          name="ClassDetails" 
          component={ClassDetailsScreen} 
          options={{ title: 'About Class' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}