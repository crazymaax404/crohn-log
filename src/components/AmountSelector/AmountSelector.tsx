import { Text, TouchableOpacity, View } from "react-native";
import { AMOUNT_LABELS, AMOUNT_ORDER } from "../../constants/labels";
import { styles } from "./amountSelector.styles";
import type { AmountSelectorProps } from "./amountSelector.interfaces";

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
            <Text
              style={[
                styles.optionLabel,
                selected && styles.optionLabelSelected,
              ]}
            >
              {AMOUNT_LABELS[amount]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
