import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import {
  AMOUNT_LABELS,
  MEAL_TYPE_LABELS,
  SYMPTOM_BACKGROUND_COLORS,
  SYMPTOM_COLORS,
  SYMPTOM_ICONS,
  SYMPTOM_LABELS,
} from '../../constants/labels';
import type { Meal } from '../../types/meal';

interface MealCardProps {
  meal: Meal;
  onPress: () => void;
}

export function MealCard({ meal, onPress }: MealCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{MEAL_TYPE_LABELS[meal.mealType]}</Text>
        <View style={[styles.symptomBadge, { backgroundColor: SYMPTOM_BACKGROUND_COLORS[meal.symptom] }]}>
          <View style={[styles.symptomDot, { backgroundColor: SYMPTOM_COLORS[meal.symptom] }]} />
          <Ionicons name={SYMPTOM_ICONS[meal.symptom]} size={14} color={SYMPTOM_COLORS[meal.symptom]} />
          <Text style={[styles.symptomLabel, { color: SYMPTOM_COLORS[meal.symptom] }]}>
            {SYMPTOM_LABELS[meal.symptom]}
          </Text>
        </View>
      </View>

      <View style={styles.amountTag}>
        <Text style={styles.amountText}>Quantidade: {AMOUNT_LABELS[meal.amount]}</Text>
      </View>

      <View style={styles.foodsBox}>
        <Text style={styles.foodsLabel}>O QUE COMEU:</Text>
        {meal.foods.map((food) => (
          <Text key={food} style={styles.foodItem}>
            • {food}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  symptomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  symptomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  symptomLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  amountTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  amountText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  foodsBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  foodsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.placeholder,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  foodItem: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
});
