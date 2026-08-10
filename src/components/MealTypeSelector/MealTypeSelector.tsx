import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { MEAL_TYPE_LABELS, MEAL_TYPE_ORDER } from "../../constants/labels";
import { styles } from "./mealTypeSelector.styles";
import type { MealTypeSelectorProps } from "./mealTypeSelector.interfaces";

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
            <Text
              style={[
                styles.optionLabel,
                selected && styles.optionLabelSelected,
              ]}
            >
              {MEAL_TYPE_LABELS[mealType]}
            </Text>
            {selected && (
              <Ionicons name="checkmark" size={18} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
