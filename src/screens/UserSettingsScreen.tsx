import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../shared/theme/useTheme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function UserSettingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const settingsItems = [
    {
      title: 'Account',
      description: 'Manage your profile details, email, and account preferences.',
      route: 'AccountScreen' as const,
    },
    {
      title: 'Notifications',
      description: 'Control push, email, and in-app notification behavior.',
      route: 'NotificationsScreen' as const,
    },
    {
      title: 'Appearance',
      description: 'Customize theme, colors, and display options.',
      route: 'AppearanceScreen' as const,
    },
    {
      title: 'Security',
      description: 'Update password, enable 2FA, and review sign-in activity.',
      route: 'SecurityScreen' as const,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>User Settings</Text>

        <View style={styles.list}>
          {settingsItems.map((item) => (
            <View key={item.title}>
              <Pressable
                style={[
                  styles.item,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                onPress={() => navigation.navigate(item.route)}
              >
                <Text style={[styles.itemText, { color: colors.text }]}>
                  {item.title}
                </Text>
              </Pressable>
              <Text style={[styles.subText, { color: colors.textSecondary }]}>
                {item.description}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  list: {
    gap: 12,
  },
  item: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    fontSize: 14,
    lineHeight: 15,
    marginTop: 6,
    marginLeft: 6,
  }
});
