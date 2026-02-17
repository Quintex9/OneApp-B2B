import Button from '@/src/shared/components/Button';
import { useTheme } from '@/src/shared/theme/useTheme';
import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, View } from 'react-native';

// dočasne – neskôr ich rozdelíme do steps/
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2LegalInfo from './steps/Step2LegalInfo';
import Step3PublicInfo from './steps/Step3PublicProfile';
import WizardProgress from './WirazdProgress';
import Step4LocationDetails from './steps/Step4LocationDetails';
import Step5BusinessRepresentative from './steps/Step5BusinessRepresentative';
import Step6ReviewSubmit from './steps/Step6ReviewSubmit';

interface CreateBusinessWizardProps {
    visible: boolean;
    onClose: () => void;
}

export interface CreateBusinessData {
    businessName: string;
    customBusinessId?: string;

    publicBusinessName: string;
    shortName: string;
    shortDescription: string;
    longDescription: string;
    privateBusinessName: string;
    legalForm: string;
    ico: string;
    dic: string;
    icDph?: string;

    logoUrl?: string;
    coverPhotoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;

    address: string;
    country: string;
    city: string;
    postalCode: string;
    street: string;
    houseNumber?: string;

    hasContactPerson: boolean;

    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone?: string;
    contactPosition?: string;
}

const TOTAL_STEPS = 6;

export default function CreateBusinessWizard({
    visible,
    onClose,
}: CreateBusinessWizardProps) {
    const { colors } = useTheme();

    const [step, setStep] = useState(1);
    const [data, setData] = useState<CreateBusinessData>({
        businessName: '',
        customBusinessId: '',
        publicBusinessName: '',
        shortName: '',
        shortDescription: '',
        longDescription: '',
        privateBusinessName: '',
        legalForm: '',
        ico: '',
        dic: '',
        icDph: '',

        logoUrl: '',
        coverPhotoUrl: '',
        primaryColor: '',
        secondaryColor: '',

        address: '',
        country: '',
        city: '',
        postalCode: '',
        street: '',
        houseNumber: '',

        hasContactPerson: true,
        contactFirstName: '',
        contactLastName: '',
        contactEmail: '',
        contactPhone: '',
        contactPosition: '',
    });

    const updateData = (partial: Partial<CreateBusinessData>) => {
        setData((prev) => ({ ...prev, ...partial }));
    };

    const goNext = () => {
        if (step < TOTAL_STEPS) {
            setStep((s) => s + 1);
        } else {
            // finálny submit (API)
            console.log('SUBMIT', data);
            onClose();
            setStep(1);
        }
    };

    const goBack = () => {
        if (step > 1) setStep((s) => s - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Step1BasicInfo
                        data={data}
                        onChange={updateData}
                    />
                );
            case 2:
                return (
                    <Step2LegalInfo
                        data={data}
                        onChange={updateData}
                    />
                );
            case 3:
                return (
                    <Step3PublicInfo
                        data={data}
                        onChange={updateData}
                    />
                );
            case 4:
                return (
                    <Step4LocationDetails
                        data={data}
                        onChange={updateData}
                    />
                );
            case 5:
                return (
                    <Step5BusinessRepresentative
                        data={data}
                        onChange={updateData}
                    />
                );
            case 6:
                return (
                    <Step6ReviewSubmit
                        data={data}
                        onEditStep={(s) => setStep(s)}
                    />
                );


            default:
                return null;
        }
    };

    const isScrollableStep = step === 3;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View
                    style={[
                        styles.container,
                        {
                            backgroundColor: colors.card,
                            height: isScrollableStep
                                ? Dimensions.get('window').height * 0.8
                                : undefined,
                        },
                    ]}
                >

                    <WizardProgress
                        current={step}
                        total={TOTAL_STEPS}
                    />

                    <View style={styles.stepContainer}>
                        {renderStep()}
                    </View>

                    {/* FOOTER */}
                    <View style={styles.footer}>
                        <Button
                            title={step === 1 ? 'Cancel' : 'Back'}
                            variant="ghost"
                            onPress={step === 1 ? onClose : goBack}
                        />

                        <Button
                            title={step === TOTAL_STEPS ? 'Finish' : 'Next'}
                            variant="primary"
                            onPress={goNext}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 16,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        borderRadius: 16,
        padding: 20,
        width: '100%',
        maxWidth: 500,
    },

    stepContainer: {
        flex: 1,
        minHeight: 0,
    },
    footer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
});
