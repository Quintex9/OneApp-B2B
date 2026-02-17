import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../shared/components/Button';
import { useTheme } from '../shared/theme/useTheme';
import CreateBusinessWizard from '../features/createBusiness/CreateBusinessWizard';

export default function HomeScreen() {
  const { colors } = useTheme();
  const [showWizard, setShowWizard] = useState(false);

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: colors.background }]}
      edges={['top']}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            Welcome to OneApp
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Get started by creating your first business
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="+ Add Business"
              onPress={() => setShowWizard(true)}
              variant="secondary"
              fullWidth
              style={styles.button}
            />
          </View>

          <CreateBusinessWizard
            visible={showWizard}
            onClose={() => setShowWizard(false)}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
  },
  content: {
    padding: 20,
    paddingTop: 20,
  },
  formGroup: {
  marginBottom: 24,
},

label: {
  fontSize: 15,
  fontWeight: '600',
  marginBottom: 8,
},

input: {
  height: 48,
  borderRadius: 10,
  paddingHorizontal: 14,
  borderWidth: 1,
  fontSize: 16,
},

helperText: {
  marginTop: 6,
  fontSize: 13,
  lineHeight: 18,
},

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 32,
    gap: 12,
  },
  button: {
    marginBottom: 0,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalActions: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
