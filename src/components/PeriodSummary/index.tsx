import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import {
  SYMPTOM_BACKGROUND_COLORS,
  SYMPTOM_COLORS,
  SYMPTOM_LABELS,
  SYMPTOM_ORDER,
} from '../../constants/labels';
import type { Meal } from '../../types/meal';

interface PeriodSummaryProps {
  meals: Meal[];
}

export function PeriodSummary({ meals }: PeriodSummaryProps) {
  const totalFoods = meals.reduce((sum, meal) => sum + meal.foods.length, 0);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Ionicons name="pulse" size={16} color={COLORS.primary} />
          <Text style={styles.title}>RESUMO DO PERÍODO</Text>
        </View>
        <View style={styles.totalPill}>
          <Text style={styles.totalPillText}>{totalFoods} alimentos registrados</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        {SYMPTOM_ORDER.map((symptom) => {
          const count = meals.filter((meal) => meal.symptom === symptom).length;
          return (
            <View
              key={symptom}
              style={[styles.statBox, { backgroundColor: SYMPTOM_BACKGROUND_COLORS[symptom] }]}
            >
              <Text style={[styles.statValue, { color: SYMPTOM_COLORS[symptom] }]}>{count}</Text>
              <Text style={[styles.statLabel, { color: SYMPTOM_COLORS[symptom] }]}>
                {SYMPTOM_LABELS[symptom]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  totalPill: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  totalPillText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statBox: {
    flexBasis: '47%',
    flexGrow: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});
