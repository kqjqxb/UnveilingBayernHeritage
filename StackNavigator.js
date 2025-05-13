import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SweetHomeScreenP from './src/screens/SweetHomeScreenP';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, UserContext } from './src/context/UserContext';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import UnvelingLoadingPage from './src/screens/UnvelingLoadingPage';
import OnboardingOfTheUnveilingScreen from './src/screens/OnboardingOfTheUnveilingScreen';
import { AudioProvider } from './src/context/AudioContext';

const Stack = createNativeStackNavigator();

const SweetEdgeStack = () => {
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
      <AudioProvider>
        <Stack.Navigator initialRouteName={'SweetLoading'}>
          <Stack.Screen name="SweetOnboardingSP" component={OnboardingOfTheUnveilingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SweetLoading" component={UnvelingLoadingPage} options={{ headerShown: false }} />
          <Stack.Screen name="SweetHomeScreenP" component={SweetHomeScreenP} options={{ headerShown: false }} />
        </Stack.Navigator>
      </AudioProvider>
    </NavigationContainer>
  );
};


export default SweetEdgeStack;
