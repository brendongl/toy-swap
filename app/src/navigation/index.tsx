import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens will be imported here as they are created
// import HomeScreen from '@/screens/HomeScreen';
// import AuthScreen from '@/screens/AuthScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder screen component
const PlaceholderScreen = () => {
  return null;
};

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Browse"
        component={PlaceholderScreen}
        options={{ title: 'Browse' }}
      />
      <Tab.Screen
        name="MyToys"
        component={PlaceholderScreen}
        options={{ title: 'My Toys' }}
      />
      <Tab.Screen
        name="Matches"
        component={PlaceholderScreen}
        options={{ title: 'Matches' }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={PlaceholderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
