import { useTheme } from '@/src/shared/theme/useTheme';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CreateBusinessData } from '../CreateBusinessWizard';

interface Step3BasicInfoProps {
    data: CreateBusinessData;
    onChange: (data: Partial<CreateBusinessData>) => void;
}

export default function Step3PublicInfo({
    data,
    onChange,
}: Step3BasicInfoProps) {
    const { colors } = useTheme();

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ 
                paddingBottom: 32,
                paddingHorizontal: 0,
            }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
        >

            {/* HEADER */}
            <View style={{ flexDirection: "row", gap: 8 }}>
                <Image
                    source={require('@/assets/images/file.png')}
                    style={{
                        width: 35,
                        height: 35,
                    }}
                />
                <Text style={[styles.title, { color: colors.text }]}>
                    Public Profile
                </Text>
            </View>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Step 3 of 6 - Brand & Presentation
            </Text>

            {/* Business Name */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Public Business Name <Text style={{ color: colors.error }}>*</Text>
                </Text>

                <TextInput
                    value={data.businessName}
                    onChangeText={(v) => onChange({ publicBusinessName: v })}
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
                    Name displayed to customers
                </Text>
            </View>

            {/* Short name (optional) */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Short Name {""}
                    <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
                </Text>

                <TextInput
                    value={data.customBusinessId}
                    onChangeText={(v) => onChange({ shortName: v })}
                    placeholder="e.g., MBS"
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
                    Abbreviated version for compact displays
                </Text>
            </View>

            {/* Short description */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Short Description {""}
                    <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
                </Text>

                <TextInput
                    value={data.customBusinessId}
                    onChangeText={(v) => onChange({ shortDescription: v })}
                    placeholder="Brief description in one sentence"
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

            {/* Long description */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Long Description {""}
                    <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
                </Text>

                <TextInput
                    value={data.customBusinessId}
                    onChangeText={(v) => onChange({ longDescription: v })}
                    placeholder="Detailed description of your business"
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

            {/* Logo URL */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Logo URL <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
                </Text>

                <TextInput
                    value={data.logoUrl}
                    onChangeText={(v) => onChange({ logoUrl: v })}
                    placeholder="https://example.com/logo.png"
                    placeholderTextColor={colors.textSecondary}
                    autoCapitalize="none"
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

            {/* Cover Photo URL */}
            <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                    Cover Photo URL <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
                </Text>

                <TextInput
                    value={data.coverPhotoUrl}
                    onChangeText={(v) => onChange({ coverPhotoUrl: v })}
                    placeholder="https://example.com/cover.jpg"
                    placeholderTextColor={colors.textSecondary}
                    autoCapitalize="none"
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

            <View style={{ flexDirection: 'row', gap: 12 }}>
                {/* Primary Color */}
                <View style={{ flex: 1 }}>
                    <Text style={[styles.label, { color: colors.text }]}>
                        Primary Color <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: 4,
                                backgroundColor: data.primaryColor || '#000000',
                                borderWidth: 1,
                                borderColor: colors.border,
                            }}
                        />

                        <TextInput
                            value={data.primaryColor}
                            onChangeText={(v) => onChange({ primaryColor: v })}
                            placeholder="#000000"
                            placeholderTextColor={colors.textSecondary}
                            autoCapitalize="none"
                            style={[
                                styles.input,
                                {
                                    flex: 1,
                                    backgroundColor: colors.surface,
                                    color: colors.text,
                                    borderColor: colors.border,
                                },
                            ]}
                        />
                    </View>
                </View>

                {/* Secondary Color */}
                <View style={{ flex: 1 }}>
                    <Text style={[styles.label, { color: colors.text }]}>
                        Secondary Color <Text style={{ color: colors.textSecondary }}>(Optional)</Text>
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: 4,
                                backgroundColor: data.secondaryColor || '#ffffff',
                                borderWidth: 1,
                                borderColor: colors.border,
                            }}
                        />

                        <TextInput
                            value={data.secondaryColor}
                            onChangeText={(v) => onChange({ secondaryColor: v })}
                            placeholder="#ffffff"
                            placeholderTextColor={colors.textSecondary}
                            autoCapitalize="none"
                            style={[
                                styles.input,
                                {
                                    flex: 1,
                                    backgroundColor: colors.surface,
                                    color: colors.text,
                                    borderColor: colors.border,
                                },
                            ]}
                        />
                    </View>
                </View>
            </View>


        </ScrollView>
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
    helperText: {
        marginTop: 6,
        fontSize: 13,
        lineHeight: 18,
    },
});
