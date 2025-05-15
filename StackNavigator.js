import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UnveilingHomeScreen from './src/screens/UnveilingHomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, UserContext } from './src/context/UserContext';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import UnvelingLoadingPage from './src/screens/UnvelingLoadingPage';
import OnboardingOfTheUnveilingScreen from './src/screens/OnboardingOfTheUnveilingScreen';

const Stack = createNativeStackNavigator();

const CastleDefenderStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={'LoadUnveilingApp'}>
          <Stack.Screen name="OnbOfTheUnveiling" component={OnboardingOfTheUnveilingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoadUnveilingApp" component={UnvelingLoadingPage} options={{ headerShown: false }} />
          <Stack.Screen name="UnveilingHomeScreen" component={UnveilingHomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default CastleDefenderStack;
