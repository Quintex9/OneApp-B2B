import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/src/shared/theme/useTheme';
import { can } from '@/src/features/authz/permissions';
import { useBusinessSession } from '@/src/features/business/businessSession';
import Button from '@/src/shared/components/Button';

type DayHours = {
  day: string;
  open: string;
  close: string;
  closed: boolean;
};

const INITIAL_HOURS: DayHours[] = [
  { day: 'Mon', open: '08:00', close: '20:00', closed: false },
  { day: 'Tue', open: '08:00', close: '20:00', closed: false },
  { day: 'Wed', open: '08:00', close: '20:00', closed: false },
  { day: 'Thu', open: '08:00', close: '20:00', closed: false },
  { day: 'Fri', open: '08:00', close: '22:00', closed: false },
  { day: 'Sat', open: '10:00', close: '22:00', closed: false },
  { day: 'Sun', open: '10:00', close: '18:00', closed: false },
];

export default function BusinessProfileScreen() {
  const { colors } = useTheme();
  const { activeRole, selectedBusiness } = useBusinessSession();
  const canEditProfile = can(activeRole, 'profile.edit');

  const [contactEmail, setContactEmail] = useState('info@business.sk');
  const [contactPhone, setContactPhone] = useState('+421 900 000 000');
  const [hours, setHours] = useState<DayHours[]>(INITIAL_HOURS);

  const updateHours = (day: string, key: 'open' | 'close' | 'closed', value: string | boolean) => {
    setHours((prev) => prev.map((item) => (item.day === day ? { ...item, [key]: value } : item)));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Business Profile</Text>
        <Text style={[styles.scope, { color: colors.primary }]}>
          Active business: {selectedBusiness?.name ?? 'N/A'}
        </Text>

        <View style={[styles.readOnlyBox, { borderColor: colors.warning, backgroundColor: colors.surface }]}>
          <Text style={{ color: colors.text }}>
            {canEditProfile
              ? `Mas opravnenie upravovat. Rola: ${activeRole}`
              : `Nemozes upravovat. Rola: ${activeRole}`}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Kontakty</Text>
          <TextInput
            value={contactEmail}
            onChangeText={setContactEmail}
            editable={canEditProfile}
            placeholder="Kontakt email"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text, backgroundColor: colors.background },
            ]}
          />
          <TextInput
            value={contactPhone}
            onChangeText={setContactPhone}
            editable={canEditProfile}
            placeholder="Kontakt telefon"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text, backgroundColor: colors.background },
            ]}
          />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Otváracie hodiny</Text>
          {hours.map((item) => (
            <View key={item.day} style={[styles.hoursRow, { borderBottomColor: colors.border }]}>
              <Text style={[styles.dayText, { color: colors.text }]}>{item.day}</Text>
              <TextInput
                value={item.open}
                onChangeText={(v) => updateHours(item.day, 'open', v)}
                editable={canEditProfile && !item.closed}
                placeholder="08:00"
                placeholderTextColor={colors.textSecondary}
                style={[
                  styles.hoursInput,
                  { borderColor: colors.border, color: colors.text, backgroundColor: colors.background },
                ]}
              />
              <TextInput
                value={item.close}
                onChangeText={(v) => updateHours(item.day, 'close', v)}
                editable={canEditProfile && !item.closed}
                placeholder="20:00"
                placeholderTextColor={colors.textSecondary}
                style={[
                  styles.hoursInput,
                  { borderColor: colors.border, color: colors.text, backgroundColor: colors.background },
                ]}
              />
              <Pressable
                disabled={!canEditProfile}
                onPress={() => updateHours(item.day, 'closed', !item.closed)}
                style={[
                  styles.closedChip,
                  {
                    borderColor: item.closed ? colors.error : colors.border,
                    backgroundColor: item.closed ? colors.error : colors.background,
                    opacity: canEditProfile ? 1 : 0.5,
                  },
                ]}>
                <Text style={{ color: item.closed ? '#FFFFFF' : colors.textSecondary, fontSize: 12 }}>
                  {item.closed ? 'Closed' : 'Open'}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        <Button title="Ulozit zmeny" onPress={() => {}} disabled={!canEditProfile} fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 12,
    paddingBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  scope: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: -4,
  },
  readOnlyBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 4,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  dayText: {
    width: 34,
    fontSize: 13,
    fontWeight: '600',
  },
  hoursInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minWidth: 68,
    fontSize: 13,
  },
  closedChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginLeft: 'auto',
  },
});
