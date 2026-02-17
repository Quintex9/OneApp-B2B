import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
} from 'react-native';
import { useTheme } from '@/src/shared/theme/useTheme';
import { CreateBusinessData } from '../CreateBusinessWizard';

interface Step2LegalInfoProps {
    data: CreateBusinessData;
    onChange: (data: Partial<CreateBusinessData>) => void;
}

const LEGAL_FORMS = [
    { value: 'as', label: 'a.s. (Akciová spoločnosť)' },
    { value: 'druz', label: 'druž. (Družstvo)' },
    { value: 'jsa', label: 'j.s.a. (Jednoduchá spoločnosť na akcie)' },
    { value: 'ks', label: 'k.s. (Komanditná spoločnosť)' },
    { value: 'sp', label: 'š.p. (Štátny podnik)' },
    { value: 'sro', label: 's.r.o. (Spoločnosť s ručením obmedzeným)' },
    { value: 'szco', label: 'SZČO (Živnostník – samostatne zárobkovo činná osoba)' },
    { value: 'vos', label: 'v.o.s. (Verejná obchodná spoločnosť)' },
];

export default function Step2LegalInfo({ data, onChange }: Step2LegalInfoProps) {
    const { colors } = useTheme();
    const [showSelect, setShowSelect] = useState(false);

    const selectedLabel =
        LEGAL_FORMS.find((f) => f.value === data.legalForm)?.label;

    return (
        <View>
            {/* HEADER */}
            <View style={{flexDirection: "row", gap: 4}}>
                <Image
                    source={require('@/assets/images/file.png')}
                    style={{
                        width: 35,
                        height: 35,
                    }}
                />
                <Text style={[styles.title, { color: colors.text }]}>Legal Information</Text>
            </View>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Step 2 of 6 – Company Registration Details
            </Text>

            {/* Private Business Name */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Private Business Name <Text style={{ color: colors.error }}>*</Text>
                </Text>

                <TextInput
                    value={data.privateBusinessName}
                    onChangeText={(v) => onChange({ privateBusinessName: v })}
                    placeholder="e.g., My Company s.r.o."
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
            </View>

            {/* Legal Form */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Legal Form <Text style={{ color: colors.error }}>*</Text>
                </Text>

                <Pressable
                    onPress={() => setShowSelect(true)}
                    style={[
                        styles.select,
                        {
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                        },
                    ]}
                >
                    <Text
                        style={{
                            color: selectedLabel ? colors.text : colors.textSecondary,
                        }}
                    >
                        {selectedLabel ?? 'Select legal form'}
                    </Text>
                </Pressable>
            </View>

            {/* ICO */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    IČO (Company ID) <Text style={{ color: colors.error }}>*</Text>
                </Text>

                <TextInput
                    value={data.ico}
                    onChangeText={(v) => onChange({ ico: v })}
                    placeholder="e.g., 12345678"
                    keyboardType="numeric"
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
            </View>

            {/* DIC */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    DIČ (Tax ID) <Text style={{ color: colors.error }}>*</Text>
                </Text>

                <TextInput
                    value={data.dic}
                    onChangeText={(v) => onChange({ dic: v })}
                    placeholder="e.g., 1234567890"
                    keyboardType="numeric"
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
            </View>

            {/* IC DPH */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    IČ DPH (VAT ID){' '}
                    <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
                </Text>

                <TextInput
                    value={data.icDph}
                    onChangeText={(v) => onChange({ icDph: v })}
                    placeholder="e.g., SK1234567890"
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
            </View>

            {/* MODAL S VÝBEROM */}
            <Modal
                visible={showSelect}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSelect(false)}
            >
                <Pressable
                    style={styles.selectOverlay}
                    onPress={() => setShowSelect(false)}
                >
                    <View style={[styles.selectContainer, { backgroundColor: colors.card }]}>
                        {LEGAL_FORMS.map((item) => {
                            const active = item.value === data.legalForm;

                            return (
                                <Pressable
                                    key={item.value}
                                    onPress={() => {
                                        onChange({ legalForm: item.value });
                                        setShowSelect(false);
                                    }}
                                    style={[
                                        styles.option,
                                        active && { backgroundColor: colors.surface },
                                    ]}
                                >
                                    <Text style={{ color: colors.text }}>{item.label}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
    subtitle: { fontSize: 14, marginBottom: 24 },
    formGroup: { marginBottom: 24 },
    label: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
    input: {
        height: 48,
        borderRadius: 10,
        paddingHorizontal: 14,
        borderWidth: 1,
        fontSize: 16,
    },
    select: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 14,
        justifyContent: 'center',
    },

    selectOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        padding: 20,
    },
    selectContainer: {
        borderRadius: 14,
        overflow: 'hidden',
        paddingVertical: 8,
    },
    option: {
        paddingVertical: 14,
        paddingHorizontal: 18,
    },
});
