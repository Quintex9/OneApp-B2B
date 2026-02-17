import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useTheme } from '@/src/shared/theme/useTheme';
import { CreateBusinessData } from '../CreateBusinessWizard';

interface Step6ReviewSubmitProps {
  data: CreateBusinessData;
  onEditStep: (step: number) => void;
}

export default function Step6ReviewSubmit({
  data,
  onEditStep,
}: Step6ReviewSubmitProps) {
  const { colors } = useTheme();

  const Section = ({
    title,
    step,
    children,
  }: {
    title: string;
    step: number;
    children: React.ReactNode;
  }) => (
    <View style={[styles.section, { borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {title}
        </Text>

        <Pressable onPress={() => onEditStep(step)}>
          <Text style={{ color: colors.primary }}>Edit</Text>
        </Pressable>
      </View>

      {children}
    </View>
  );

  const Row = ({ label, value }: { label: string; value?: string }) => (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.value, { color: colors.text }]}>
        {value || '—'}
      </Text>
    </View>
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Review & Submit
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Step 6 of 6 – Review your information
      </Text>

      <Section title="Basic Information" step={1}>
        <Row label="Business Name" value={data.businessName} />
        <Row label="Custom ID" value={data.customBusinessId} />
      </Section>

      <Section title="Legal Information" step={2}>
        <Row label="Private Name" value={data.privateBusinessName} />
        <Row label="Legal Form" value={data.legalForm} />
        <Row label="IČO" value={data.ico} />
        <Row label="DIČ" value={data.dic} />
        <Row label="IČ DPH" value={data.icDph} />
      </Section>

      <Section title="Public Profile" step={3}>
        <Row label="Public Name" value={data.publicBusinessName} />
        <Row label="Short Name" value={data.shortName} />
        <Row label="Primary Color" value={data.primaryColor} />
        <Row label="Secondary Color" value={data.secondaryColor} />
      </Section>

      <Section title="Business Address" step={4}>
        <Row label="Country" value={data.country} />
        <Row label="City" value={data.city} />
        <Row label="Street" value={data.street} />
        <Row label="Postal Code" value={data.postalCode} />
      </Section>

      <Section title="Contact Person" step={5}>
        {!data.hasContactPerson ? (
          <Text style={{ color: colors.textSecondary }}>
            No contact person added
          </Text>
        ) : (
          <>
            <Row label="First Name" value={data.contactFirstName} />
            <Row label="Last Name" value={data.contactLastName} />
            <Row label="Email" value={data.contactEmail} />
            <Row label="Phone" value={data.contactPhone} />
          </>
        )}
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 24 },

  section: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600' },

  row: { marginBottom: 6 },
  label: { fontSize: 13 },
  value: { fontSize: 15, fontWeight: '500' },
});
