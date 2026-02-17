import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@/src/shared/theme/useTheme';
import { CreateBusinessData } from '../CreateBusinessWizard';

interface Step5BusinessRepresentativeProps {
  data: CreateBusinessData;
  onChange: (data: Partial<CreateBusinessData>) => void;
}

export default function Step5BusinessRepresentative({
  data,
  onChange,
}: Step5BusinessRepresentativeProps) {
  const { colors } = useTheme();

  const toggleContactPerson = () => {
    onChange({
      hasContactPerson: !data.hasContactPerson,
    });
  };

  return (
    <View>
      {/* HEADER */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Image
          source={require('@/assets/images/person.png')}
          style={{ width: 35, height: 35 }}
        />
        <Text style={[styles.title, { color: colors.text }]}>
          Contact Person
        </Text>
      </View>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Step 5 of 6 – Business Representative (Optional)
      </Text>

      {/* CHECKBOX */}
      <Pressable
        onPress={toggleContactPerson}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: colors.border,
              backgroundColor: data.hasContactPerson ? colors.primary : 'transparent',
            },
          ]}
        />
        <Text style={{ color: colors.text }}>
          Add a contact person for this business
        </Text>
      </Pressable>

      {/* Ak nie je zakliknuty checkbox */}
      {!data.hasContactPerson && (
        <Text style={{ color: colors.textSecondary, textAlign: "center" }}>
          No contact person will be added. You can add this information later.
        </Text>
      )}

      {data.hasContactPerson && (
        <>
          {/* First + Last name */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.text }]}>
                First Name <Text style={{ color: colors.error }}>*</Text>
              </Text>

              <TextInput
                value={data.contactFirstName}
                onChangeText={(v) => onChange({ contactFirstName: v })}
                placeholder="e.g., John"
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
                Last Name <Text style={{ color: colors.error }}>*</Text>
              </Text>

              <TextInput
                value={data.contactLastName}
                onChangeText={(v) => onChange({ contactLastName: v })}
                placeholder="e.g., Doe"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                }]}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Email <Text style={{ color: colors.error }}>*</Text>
            </Text>

            <TextInput
              value={data.contactEmail}
              onChangeText={(v) => onChange({ contactEmail: v })}
              placeholder="e.g., john.doe@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              }]}
            />
          </View>

          {/* Phone */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Phone Number <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
            </Text>

            <TextInput
              value={data.contactPhone}
              onChangeText={(v) => onChange({ contactPhone: v })}
              placeholder="+421 900 123 456"
              keyboardType="phone-pad"
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              }]}
            />
          </View>

          {/* Position */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Position <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
            </Text>

            <TextInput
              value={data.contactPosition}
              onChangeText={(v) => onChange({ contactPosition: v })}
              placeholder="e.g., Manager"
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              }]}
            />
          </View>
        </>
      )}
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
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 10,
  },
});
