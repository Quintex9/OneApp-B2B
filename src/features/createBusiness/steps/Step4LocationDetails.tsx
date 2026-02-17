import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@/src/shared/theme/useTheme';
import { CreateBusinessData } from '../CreateBusinessWizard';

interface Step4LocationDetailsProps {
  data: CreateBusinessData;
  onChange: (data: Partial<CreateBusinessData>) => void;
}

export default function Step4LocationDetails({
  data,
  onChange,
}: Step4LocationDetailsProps) {
  const { colors } = useTheme();

  return (
    <View>
      {/* HEADER */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Image
          source={require('@/assets/images/location.png')}
          style={{ width: 35, height: 35 }}
        />
        <Text style={[styles.title, { color: colors.text }]}>
          Business Address
        </Text>
      </View>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Step 4 of 6 – Location Details
      </Text>

      {/* Address */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>
          Address <Text style={{ color: colors.error }}>*</Text>
        </Text>

        <TextInput
          value={data.address}
          onChangeText={(v) => onChange({ address: v })}
          placeholder="Search for an address..."
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          }]}
        />
      </View>

      {/* Country */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>
          Country <Text style={{ color: colors.error }}>*</Text>
        </Text>

        <TextInput
          value={data.country}
          onChangeText={(v) => onChange({ country: v })}
          placeholder="Select country"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          }]}
        />
      </View>

      {/* City + Postal Code */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.label, { color: colors.text }]}>
            City <Text style={{ color: colors.error }}>*</Text>
          </Text>

          <TextInput
            value={data.city}
            onChangeText={(v) => onChange({ city: v })}
            placeholder="e.g. Bratislava"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            }]}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.label, { color: colors.text }]}>
            Postal Code <Text style={{ color: colors.error }}>*</Text>
          </Text>

          <TextInput
            value={data.postalCode}
            onChangeText={(v) => onChange({ postalCode: v })}
            placeholder="e.g. 81101"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            }]}
          />
        </View>
      </View>

      {/* Street */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>
          Street <Text style={{ color: colors.error }}>*</Text>
        </Text>

        <TextInput
          value={data.street}
          onChangeText={(v) => onChange({ street: v })}
          placeholder="e.g. Hlavná ulica"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          }]}
        />
      </View>

      {/* House Number */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>
          House Number <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
        </Text>

        <TextInput
          value={data.houseNumber}
          onChangeText={(v) => onChange({ houseNumber: v })}
          placeholder="e.g. 123"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
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
});
