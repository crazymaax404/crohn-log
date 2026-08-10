import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { AMOUNT_LABELS, AMOUNT_ORDER } from '../../constants/labels';
import type { Amount } from '../../types/meal';

interface AmountSelectorProps {
  value: Amount;
  onChange: (amount: Amount) => void;
}

export function AmountSelector({ value, onChange }: AmountSelectorProps) {
  return (
    <View style={styles.row}>
      {AMOUNT_ORDER.map((amount) => {
        const selected = amount === value;
        return (
          <TouchableOpacity
            key={amount}
            style={[styles.option, selected && styles.optionSelected]}
            onPress={() => onChange(amount)}
          >
            <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
              {AMOUNT_LABELS[amount]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  optionSelected: {
    backgroundColor: COLORS.selectedDark,
    borderColor: COLORS.selectedDark,
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
