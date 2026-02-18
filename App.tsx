import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { AuthSessionProvider } from './src/features/authz/authSession';
import AppNavigator from './src/navigation/AppNavigator';
import { BusinessSessionProvider } from './src/features/business/businessSession';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthSessionProvider>
        <BusinessSessionProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </BusinessSessionProvider>
      </AuthSessionProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
