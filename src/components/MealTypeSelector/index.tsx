import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { MEAL_TYPE_LABELS, MEAL_TYPE_ORDER } from '../../constants/labels';
import type { MealType } from '../../types/meal';

interface MealTypeSelectorProps {
  value: MealType;
  onChange: (mealType: MealType) => void;
}

export function MealTypeSelector({ value, onChange }: MealTypeSelectorProps) {
  return (
    <View style={styles.grid}>
      {MEAL_TYPE_ORDER.map((mealType) => {
        const selected = mealType === value;
        return (
          <TouchableOpacity
            key={mealType}
            style={[styles.option, selected && styles.optionSelected]}
            onPress={() => onChange(mealType)}
          >
            <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
              {MEAL_TYPE_LABELS[mealType]}
            </Text>
            {selected && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
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
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  optionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#e9f8f1',
  },
  optionLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  optionLabelSelected: {
    color: COLORS.primaryDark,
  },
});
