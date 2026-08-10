import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  SYMPTOM_COLORS,
  SYMPTOM_ICONS,
  SYMPTOM_LABELS,
  SYMPTOM_ORDER,
} from "../../constants/labels";
import { styles } from "./symptomSelector.styles";
import type { SymptomSelectorProps } from "./symptomSelector.interfaces";

export function SymptomSelector({ value, onChange }: SymptomSelectorProps) {
  return (
    <View style={styles.grid}>
      {SYMPTOM_ORDER.map((symptom) => {
        const selected = symptom === value;
        const symptomColor = SYMPTOM_COLORS[symptom];
        return (
          <TouchableOpacity
            key={symptom}
            style={[
              styles.option,
              selected && {
                backgroundColor: symptomColor,
                borderColor: symptomColor,
              },
            ]}
            onPress={() => onChange(symptom)}
          >
            <Ionicons
              name={SYMPTOM_ICONS[symptom]}
              size={18}
              color={selected ? COLORS.surface : COLORS.textPrimary}
            />
            <Text
              style={[
                styles.optionLabel,
                selected && styles.optionLabelSelected,
              ]}
            >
              {SYMPTOM_LABELS[symptom]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
