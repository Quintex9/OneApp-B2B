import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/src/shared/theme/useTheme';
import { can } from '@/src/features/authz/permissions';
import { useBusinessSession } from '@/src/features/business/businessSession';
import Button from '@/src/shared/components/Button';

type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  daily: boolean;
};

const INITIAL_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Chicken Burger', category: 'Main', price: '8.90', daily: false },
  { id: 'm2', name: 'Ceasar Salad', category: 'Salad', price: '7.40', daily: true },
  { id: 'm3', name: 'Espresso', category: 'Drinks', price: '2.20', daily: false },
];

export default function MenuPricingScreen() {
  const { colors } = useTheme();
  const { activeRole, selectedBusiness } = useBusinessSession();

  const canEditPricing = can(activeRole, 'pricing.edit_standard');

  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Main');
  const [newPrice, setNewPrice] = useState('');

  const updateItem = (id: string, key: 'name' | 'category' | 'price' | 'daily', value: string | boolean) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const addItem = () => {
    if (!canEditPricing) return;
    if (!newName.trim() || !newPrice.trim()) return;

    const next: MenuItem = {
      id: `m-${Date.now()}`,
      name: newName.trim(),
      category: newCategory.trim() || 'Main',
      price: newPrice.trim(),
      daily: false,
    };

    setItems((prev) => [next, ...prev]);
    setNewName('');
    setNewCategory('Main');
    setNewPrice('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Menu & Pricing</Text>
        <Text style={[styles.scope, { color: colors.primary }]}>Active business: {selectedBusiness?.name ?? 'N/A'}</Text>

        <View style={[styles.readOnlyBox, { borderColor: colors.warning, backgroundColor: colors.surface }]}>
          <Text style={{ color: colors.text }}>
            {canEditPricing
              ? `Mas opravnenie upravovat cennik. Rola: ${activeRole}`
              : `Nemozes upravovat cennik. Rola: ${activeRole}`}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Pridat polozku</Text>
          <TextInput
            value={newName}
            onChangeText={setNewName}
            editable={canEditPricing}
            placeholder="Nazov"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]}
          />
          <TextInput
            value={newCategory}
            onChangeText={setNewCategory}
            editable={canEditPricing}
            placeholder="Kategoria"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]}
          />
          <TextInput
            value={newPrice}
            onChangeText={setNewPrice}
            editable={canEditPricing}
            placeholder="Cena (napr. 8.90)"
            keyboardType="decimal-pad"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]}
          />
          <Button title="Pridat polozku" onPress={addItem} disabled={!canEditPricing} fullWidth />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Cennik a denne menu</Text>
          {items.map((item) => (
            <View key={item.id} style={[styles.itemRow, { borderBottomColor: colors.border }]}>
              <View style={styles.itemInputs}>
                <TextInput
                  value={item.name}
                  onChangeText={(v) => updateItem(item.id, 'name', v)}
                  editable={canEditPricing}
                  placeholder="Nazov"
                  placeholderTextColor={colors.textSecondary}
                  style={[styles.smallInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]}
                />
                <TextInput
                  value={item.category}
                  onChangeText={(v) => updateItem(item.id, 'category', v)}
                  editable={canEditPricing}
                  placeholder="Kategoria"
                  placeholderTextColor={colors.textSecondary}
                  style={[styles.smallInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]}
                />
                <TextInput
                  value={item.price}
                  onChangeText={(v) => updateItem(item.id, 'price', v)}
                  editable={canEditPricing}
                  placeholder="Cena"
                  keyboardType="decimal-pad"
                  placeholderTextColor={colors.textSecondary}
                  style={[styles.smallInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.background }]}
                />
              </View>

              <Pressable
                disabled={!canEditPricing}
                onPress={() => updateItem(item.id, 'daily', !item.daily)}
                style={[
                  styles.dailyChip,
                  {
                    borderColor: item.daily ? colors.success : colors.border,
                    backgroundColor: item.daily ? colors.success : colors.background,
                    opacity: canEditPricing ? 1 : 0.5,
                  },
                ]}>
                <Text style={{ color: item.daily ? '#FFFFFF' : colors.textSecondary, fontSize: 12 }}>
                  {item.daily ? 'Daily menu' : 'Standard'}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        <Button title="Ulozit cennik" onPress={() => {}} disabled={!canEditPricing} fullWidth />
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
  itemRow: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    gap: 8,
  },
  itemInputs: {
    flexDirection: 'row',
    gap: 8,
  },
  smallInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 13,
  },
  dailyChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
});
