import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../shared/theme/useTheme';
import { useBusinessSession } from '@/src/features/business/businessSession';

export default function ReservationsScreen() {
  const { colors } = useTheme();
  const { selectedBusiness } = useBusinessSession();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Rezervácie</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Odbavenie zákazníka & Rezervácie
        </Text>

        <Text style={[styles.scope, { color: colors.primary }]}>
          Aktivna prevadzka: {selectedBusiness?.name ?? 'N/A'}
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>3. Rezervácie</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            • QR skener na verifikáciu{'\n'}
            • Reservation System{'\n'}
            • Waitlist (čakačka){'\n'}
            • Push notifikácie
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
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
  scope: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
  },
});
