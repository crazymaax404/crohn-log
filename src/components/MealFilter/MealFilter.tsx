import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SYMPTOM_LABELS, SYMPTOM_ORDER } from "../../constants/labels";
import { styles } from "./mealFilter.styles";
import type { MealFilterProps, MealFilterValue } from "./mealFilter.interfaces";

const FILTER_OPTIONS: { value: MealFilterValue; label: string }[] = [
  { value: "all", label: "Todos" },
  ...SYMPTOM_ORDER.map((symptom) => ({
    value: symptom,
    label: SYMPTOM_LABELS[symptom],
  })),
];

export function MealFilter({ value, onChange, counts }: MealFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {FILTER_OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={() => onChange(option.value)}
          >
            <Text
              style={[styles.chipLabel, selected && styles.chipLabelSelected]}
            >
              {option.label}
            </Text>
            <Text
              style={[styles.chipCount, selected && styles.chipCountSelected]}
            >
              {counts[option.value] ?? 0}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
