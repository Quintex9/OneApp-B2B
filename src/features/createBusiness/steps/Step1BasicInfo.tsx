import React from 'react';
import { Image, StyleSheet, Text, TextInput, View, ViewBase } from 'react-native';
import { useTheme } from '@/src/shared/theme/useTheme';
import { CreateBusinessData } from '../CreateBusinessWizard';

interface Step1BasicInfoProps {
  data: CreateBusinessData;
  onChange: (data: Partial<CreateBusinessData>) => void;
}

export default function Step1BasicInfo({
  data,
  onChange,
}: Step1BasicInfoProps) {
  const { colors } = useTheme();

  return (
    <View>
      {/* HEADER */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Image
          source={require('@/assets/images/business.png')}
          style={{
            width: 35,
            height: 35,
          }}
        />
        <Text style={[styles.title, { color: colors.text }]}>
          Create New Business
        </Text>
      </View>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Step 1 of 6 – Basic Information
      </Text>

      {/* Business Name */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>
          Business Name <Text style={{ color: colors.error }}>*</Text>
        </Text>

        <TextInput
          value={data.businessName}
          onChangeText={(v) => onChange({ businessName: v })}
          placeholder="e.g., My Booking Studio"
          placeholderTextColor={colors.textSecondary}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
        />

        <Text style={[styles.helperText, { color: colors.textSecondary }]}>
          This will be used as the main identifier for your business
        </Text>
      </View>

      {/* Custom Business ID */}
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>
          Custom Business ID{' '}
          <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
        </Text>

        <TextInput
          value={data.customBusinessId}
          onChangeText={(v) => onChange({ customBusinessId: v })}
          placeholder="e.g., MBS-001"
          placeholderTextColor={colors.textSecondary}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
        />

        <Text style={[styles.helperText, { color: colors.textSecondary }]}>
          Custom identifier for internal tracking (leave empty to auto-generate)
        </Text>
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
});
