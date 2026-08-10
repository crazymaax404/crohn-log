import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { isPainfulSymptom } from '../../constants/labels';
import type { Meal } from '../../types/meal';

interface PeriodSummaryProps {
  meals: Meal[];
}

export function PeriodSummary({ meals }: PeriodSummaryProps) {
  const totalFoods = meals.reduce((sum, meal) => sum + meal.foods.length, 0);
  const wellCount = meals.filter((meal) => meal.symptom === 'well').length;
  const discomfortCount = meals.filter((meal) => meal.symptom === 'discomfort').length;
  const painCount = meals.filter((meal) => isPainfulSymptom(meal.symptom)).length;
  const wellPercent = meals.length > 0 ? Math.round((wellCount / meals.length) * 100) : 0;

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

      <View style={styles.statsRow}>
        <View style={[styles.statBox, styles.statBoxWell]}>
          <Text style={styles.statValueWell}>😊 {wellPercent}%</Text>
          <Text style={styles.statLabelWell}>Ficou bem ({wellCount})</Text>
        </View>
        <View style={[styles.statBox, styles.statBoxDiscomfort]}>
          <Text style={styles.statValueDiscomfort}>{discomfortCount}</Text>
          <Text style={styles.statLabelDiscomfort}>Incômodo</Text>
        </View>
        <View style={[styles.statBox, styles.statBoxPain]}>
          <Text style={styles.statValuePain}>⚠ {painCount}</Text>
          <Text style={styles.statLabelPain}>Com dor / muita dor</Text>
        </View>
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
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 4,
  },
  statBoxWell: { backgroundColor: '#e3f7ee' },
  statBoxDiscomfort: { backgroundColor: '#fdf3d6' },
  statBoxPain: { backgroundColor: '#fbe4e2' },
  statValueWell: { fontSize: 18, fontWeight: '700', color: '#0f9d6c' },
  statValueDiscomfort: { fontSize: 18, fontWeight: '700', color: '#b7860b' },
  statValuePain: { fontSize: 18, fontWeight: '700', color: '#c0392b' },
  statLabelWell: { fontSize: 11, color: '#0f9d6c', textAlign: 'center' },
  statLabelDiscomfort: { fontSize: 11, color: '#b7860b', textAlign: 'center' },
  statLabelPain: { fontSize: 11, color: '#c0392b', textAlign: 'center' },
});
