import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SystemSelectionScreen from '../../src/features/character-creation/SystemSelectionScreen';
import HeroNameScreen from '../../src/features/character-creation/HeroNameScreen';
import ChooseClassScreen from '../../src/features/character-creation/ChooseClassScreen';
import ClassDetailsScreen from '../../src/features/character-creation/ClassDetailsScreen';
import ChooseArchetypeScreen from '../../src/features/character-creation/ChooseArchetypeScreen';
import ArchetypeDetailsScreen from '../../src/features/character-creation/ArchetypeDetailsScreen';
import ChooseRaceScreen from '../../src/features/character-creation/ChooseRaceScreen';
import RaceDetailsScreen from '../../src/features/character-creation/RaceDetailsScreen';
import ChooseSubraceScreen from '../../src/features/character-creation/ChooseSubraceScreen';
import SubraceDetailsScreen from '../../src/features/character-creation/SubraceDetailsScreen';
import AbilityScoresScreen from '../../src/features/character-creation/AbilityScoresScreen';
import SkillsScreen from '../../src/features/character-creation/SkillsScreen';
import ChooseBackgroundScreen from '../../src/features/character-creation/ChooseBackgroundScreen';
import CharacterSheetScreen from '../../src/features/character-creation/CharacterSheetScreen';

const Stack = createStackNavigator();

export const CharacterCreationStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SystemSelectionScreen" component={SystemSelectionScreen} />
        <Stack.Screen name="HeroNameScreen" component={HeroNameScreen} />
        <Stack.Screen name="ChooseClass" component={ChooseClassScreen} />
        <Stack.Screen name="ClassDetails" component={ClassDetailsScreen} />
        <Stack.Screen name="ChooseArchetype" component={ChooseArchetypeScreen} />
        <Stack.Screen name="ArchetypeDetails" component={ArchetypeDetailsScreen} />
        <Stack.Screen name="ChooseRace" component={ChooseRaceScreen} />
        <Stack.Screen name="RaceDetails" component={RaceDetailsScreen} />
        <Stack.Screen name="ChooseSubrace" component={ChooseSubraceScreen} />
        <Stack.Screen name="SubraceDetailsScreen" component={SubraceDetailsScreen} />
        <Stack.Screen name="AbilityScores" component={AbilityScoresScreen} />
        <Stack.Screen name="SkillsScreen" component={SkillsScreen} />
        <Stack.Screen name="ChooseBackgroundScreen" component={ChooseBackgroundScreen} />
        <Stack.Screen name="CharacterSheetScreen" component={CharacterSheetScreen} />
    </Stack.Navigator>
);