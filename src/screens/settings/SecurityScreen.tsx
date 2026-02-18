import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/src/shared/components/Button';
import { useTheme } from '@/src/shared/theme/useTheme';
import { DEFAULT_MOCK_SESSION } from '@/src/features/authz/mockSession';
import { Ability, AppRole, can, PERMISSION_PREVIEW, ROLE_LABELS } from '@/src/features/authz/permissions';
import { useAuthSession } from '@/src/features/authz/authSession';

type ActionItem = {
  title: string;
  ability: Ability;
};

const ACTION_ITEMS: ActionItem[] = [
  { title: 'Upravit profil prevadzky', ability: 'profile.edit' },
  { title: 'Vytvorit draft ponuky', ability: 'offers.create_draft' },
  { title: 'Publikovat ponuku', ability: 'offers.publish' },
  { title: 'Upravit beznu cenu', ability: 'pricing.edit_standard' },
  { title: 'Spustit kriticku zlavu (2FA)', ability: 'pricing.edit_critical' },
  { title: 'Potvrdit rezervaciu / check-in', ability: 'reservations.manage' },
];

export default function SecurityScreen() {
  const { colors } = useTheme();
  const { signOut, session } = useAuthSession();
  const [selectedRole, setSelectedRole] = useState<AppRole>(DEFAULT_MOCK_SESSION.role);

  const roleOptions = useMemo(() => (['owner', 'manager', 'staff'] as const), []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Security</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          FE demo role-based permissions (bez backendu)
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Session</Text>
          <Text style={[styles.rowDescription, { color: colors.textSecondary }]}>
            Prihlaseny: {session?.user?.email ?? 'Unknown'}
          </Text>
          <Button title="Odhlasit sa" onPress={() => signOut()} variant="outline" fullWidth />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Aktivna rola</Text>
          <View style={styles.roleRow}>
            {roleOptions.map((role) => {
              const isActive = selectedRole === role;

              return (
                <Pressable
                  key={role}
                  onPress={() => setSelectedRole(role)}
                  style={[
                    styles.roleChip,
                    {
                      borderColor: isActive ? colors.primary : colors.border,
                      backgroundColor: isActive ? colors.primary : colors.background,
                    },
                  ]}>
                  <Text style={[styles.roleText, { color: isActive ? '#FFFFFF' : colors.text }]}>
                    {ROLE_LABELS[role]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Co moze rola menit</Text>
          {PERMISSION_PREVIEW.map((item) => (
            <View key={item.id} style={[styles.row, { borderBottomColor: colors.border }]}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.rowDescription, { color: colors.textSecondary }]}>
                {item.description}
              </Text>
              <Text style={[styles.rowAccess, { color: colors.primary }]}>
                {item.byRole[selectedRole]}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Demo akcie v UI</Text>
          {ACTION_ITEMS.map((item) => {
            const allowed = can(selectedRole, item.ability);
            return (
              <View key={item.title} style={styles.actionRow}>
                <Text style={[styles.actionTitle, { color: colors.text }]}>{item.title}</Text>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: allowed ? colors.success : colors.surface },
                  ]}>
                  <Text style={[styles.badgeText, { color: allowed ? '#FFFFFF' : colors.textSecondary }]}>
                    {allowed ? 'Povolene' : 'Bez opravnenia'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingBottom: 32,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: -8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  roleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  roleChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  rowDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  rowAccess: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    gap: 8,
  },
  actionTitle: {
    fontSize: 14,
    flex: 1,
  },
  badge: {
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
