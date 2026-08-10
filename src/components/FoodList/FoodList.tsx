import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { styles } from "./foodList.styles";
import type { FoodListProps } from "./foodList.interfaces";

export function FoodList({ foods, onRemove, onLongPress }: FoodListProps) {
  if (foods.length === 0) {
    return (
      <View style={styles.box}>
        <Text style={styles.placeholder}>
          Nenhum alimento adicionado ainda. Digite abaixo ou selecione as
          sugestões.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.box}>
        {foods.map((food) => (
          <View key={food} style={styles.row}>
            <TouchableOpacity
              style={styles.foodTextWrapper}
              onLongPress={() => onLongPress(food)}
              delayLongPress={350}
            >
              <Text style={styles.foodText}>{food}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onRemove(food)}
              accessibilityLabel={`Remover ${food}`}
            >
              <Ionicons name="close" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Text style={styles.hint}>Toque e segure em um item para renomear.</Text>
    </View>
  );
}
