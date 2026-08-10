import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface FoodListProps {
  foods: string[];
  onRemove: (food: string) => void;
  onLongPress: (food: string) => void;
}

export function FoodList({ foods, onRemove, onLongPress }: FoodListProps) {
  if (foods.length === 0) {
    return (
      <View style={styles.box}>
        <Text style={styles.placeholder}>
          Nenhum alimento adicionado ainda. Digite abaixo ou selecione as sugestões.
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
            <TouchableOpacity onPress={() => onRemove(food)} accessibilityLabel={`Remover ${food}`}>
              <Ionicons name="close" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Text style={styles.hint}>Toque e segure em um item para renomear.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    padding: 12,
    gap: 10,
  },
  placeholder: {
    color: COLORS.placeholder,
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  foodTextWrapper: {
    flex: 1,
    paddingVertical: 2,
  },
  foodText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  hint: {
    fontSize: 11,
    color: COLORS.placeholder,
    marginTop: 6,
  },
});
