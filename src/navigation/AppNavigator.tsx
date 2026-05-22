import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LayoutGrid, Library} from 'lucide-react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { THEME } from '../theme/sharedStyles';
import LibraryScreen from '../../src/features/library/LibraryScreen';
import CharacterSheetScreen from '../features/character-creation/CharacterSheetScreen'; 
import { CharacterCreationStack } from '../navigation/CharacterCreationStack';

import SplashScreen from '../features/auth/SplashScreen';
import AuthScreen from '../features/auth/AuthScreen';
import LoginScreen from '../features/auth/LoginScreen';
import RegisterScreen from '../features/auth/RegisterScreen';
import SystemSelectionScreen from '../features/auth/SystemSelectionScreen';

import FeedScreen from '../features/feed/FeedScreen';

const ProfileScreen = () => (
<View style={styles.screenPlaceholder}>
    <Text style={styles.placeholderText}>PROFILE</Text>
</View>
);

const Tab = createBottomTabNavigator();

const CharacterCreateButton = ({ onPress }: any) => (
    <TouchableOpacity
        style={styles.createButtonContainer}
        onPress={onPress}>
        <View style={styles.createButtonInner}>
            <Text style={styles.plusIcon}>+</Text>
        </View>
    </TouchableOpacity>
);

const renderCreateButton = (navigation: any) => () => (
    <CharacterCreateButton onPress={() => navigation.navigate('CharacterCreation')} />
);

export const AppTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
            headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: THEME.gold,
                tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
            }}>
            <Tab.Screen 
                name="Feed" 
                component={FeedScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <LayoutGrid color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Library" 
                component={LibraryScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Library color={color} size={size} />
                    ),
                }} 
            />

            <Tab.Screen 
                name="Create" 
                component={View}
                options={({ navigation }) => ({
                    tabBarButton: renderCreateButton(navigation),
                })}
            />
            
            <Tab.Screen name="Social" component={View} options={{ tabBarLabel: 'Social' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}>
            
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="SystemSelection" component={SystemSelectionScreen} />
            
            <Stack.Screen name="MainTabs" component={AppTabs} />
            
            <Stack.Screen name="CharacterSheetScreen" component={CharacterSheetScreen} />
            
            <Stack.Screen name="CharacterCreation" component={CharacterCreationStack} />
        </Stack.Navigator>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({
tabBar: {
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    height: 70,
    paddingBottom: 10,
},
createButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
},
createButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.gold,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: THEME.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
},
plusIcon: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
},
screenPlaceholder: {
    flex: 1,
    backgroundColor: THEME.gold,
    justifyContent: 'center',
    alignItems: 'center',
},
placeholderText: {
    color: '#fff',
    fontSize: 16,
},
});