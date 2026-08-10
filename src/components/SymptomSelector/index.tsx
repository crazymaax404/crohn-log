import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { SYMPTOM_ICONS, SYMPTOM_LABELS, SYMPTOM_ORDER } from '../../constants/labels';
import type { Symptom } from '../../types/meal';

interface SymptomSelectorProps {
  value: Symptom;
  onChange: (symptom: Symptom) => void;
}

export function SymptomSelector({ value, onChange }: SymptomSelectorProps) {
  return (
    <View style={styles.grid}>
      {SYMPTOM_ORDER.map((symptom) => {
        const selected = symptom === value;
        return (
          <TouchableOpacity
            key={symptom}
            style={[styles.option, selected && styles.optionSelected]}
            onPress={() => onChange(symptom)}
          >
            <Ionicons
              name={SYMPTOM_ICONS[symptom]}
              size={18}
              color={selected ? COLORS.surface : COLORS.textPrimary}
            />
            <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
              {SYMPTOM_LABELS[symptom]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    flexBasis: '47%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  optionLabelSelected: {
    color: COLORS.surface,
  },
});
