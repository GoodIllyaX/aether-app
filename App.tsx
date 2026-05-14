import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SystemSelectionScreen from './src/features/character-creation/SystemSelectionScreen';
import HeroNameScreen from './src/features/character-creation/HeroNameScreen';
import ChooseClassScreen from './src/features/character-creation/ChooseClassScreen';
import ClassDetailsScreen from './src/features/character-creation/ClassDetailsScreen';
import ChooseArchetypeScreen from './src/features/character-creation/ChooseArchetypeScreen';
import ArchetypeDetailsScreen from './src/features/character-creation/ArchetypeDetailsScreen';
import ChooseRaceScreen from './src/features/character-creation/ChooseRaceScreen';
import RaceDetailsScreen from './src/features/character-creation/RaceDetailsScreen';
import ChooseSubraceScreen from './src/features/character-creation/ChooseSubraceScreen';
import SubraceDetailsScreen from './src/features/character-creation/SubraceDetailsScreen';
import AbilityScoresScreen from './src/features/character-creation/AbilityScoresScreen';
import SkillsScreen from './src/features/character-creation/SkillsScreen';
import ChooseBackgroundScreen from './src/features/character-creation/ChooseBackgroundScreen';
import CharacterSheetScreen from './src/features/character-creation/CharacterSheetScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SystemSelectionScreen"
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: '#0E0915' },
          headerTintColor: 'gold',
        }}
      >

        <Stack.Screen 
          name="SystemSelectionScreen"
          component={SystemSelectionScreen}
          options={{ title: 'Setup Hero' }}
        />

        <Stack.Screen 
          name="HeroNameScreen"
          component={HeroNameScreen}
          options={{ title: 'Hero name' }}
        />
        
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

        <Stack.Screen 
          name="ChooseArchetype" 
          component={ChooseArchetypeScreen} 
          options={{ title: 'Select Archetype' }} 
        />

        <Stack.Screen 
          name="ArchetypeDetails" 
          component={ArchetypeDetailsScreen} 
          options={{ title: 'Detail Archetype' }}
        />

        <Stack.Screen 
          name="ChooseRace" 
          component={ChooseRaceScreen} 
          options={{ title: 'Choose Race' }} 
        />

        <Stack.Screen 
          name="RaceDetails" 
          component={RaceDetailsScreen} 
          options={{ title: 'Race Details' }} 
        />

        <Stack.Screen 
          name="ChooseSubrace" 
          component={ChooseSubraceScreen} 
          options={{ title: 'Choose SunRace' }} 
        />

        <Stack.Screen 
          name="SubraceDetailsScreen"
          component={SubraceDetailsScreen} 
          options={{ title: 'SubRace Details' }} 
        />

        <Stack.Screen 
          name="AbilityScores" 
          component={AbilityScoresScreen} 
          options={{ title: 'Ability Scores' }} 
        />

        <Stack.Screen 
          name="SkillsScreen" 
          component={SkillsScreen} 
          options={{ title: 'Skills' }} 
        />

        <Stack.Screen 
          name="ChooseBackgroundScreen" 
          component={ChooseBackgroundScreen} 
          options={{ title: 'Choose Background' }} 
        />

        <Stack.Screen 
          name="CharacterSheetScreen" 
          component={CharacterSheetScreen} 
          options={{ title: 'Character Sheet' }} 
        />
      </Stack.Navigator>  

    </NavigationContainer>
  );
}