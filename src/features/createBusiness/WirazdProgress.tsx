import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/src/shared/theme/useTheme';

interface WizardProgressProps {
  current: number;
  total: number;
}

export default function WizardProgress({
  current,
  total,
}: WizardProgressProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const stepIndex = index + 1;
        const isActive = stepIndex <= current;

        return (
          <View
            key={stepIndex}
            style={[
              styles.pill,
              {
                backgroundColor: isActive
                  ? colors.text
                  : colors.surface,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  pill: {
    flex: 1,
    height: 6,
    borderRadius: 999,
  },
});
