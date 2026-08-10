import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { MEAL_TYPE_LABELS, SYMPTOM_LABELS } from '../../constants/labels';
import { formatBRDate } from '../../utils/date';
import type { PainHistoryMatch } from '../../types/meal';

interface FoodPainHistoryCardProps {
  matches: PainHistoryMatch[];
}

export function FoodPainHistoryCard({ matches }: FoodPainHistoryCardProps) {
  if (matches.length === 0) return null;

  const single = matches.length === 1 ? matches[0] : null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="warning" size={16} color="#c0392b" />
        <Text style={styles.title}>Atenção</Text>
      </View>

      {single ? (
        <>
          <Text style={styles.description}>
            Você já registrou "{single.food}" em uma refeição em que sentiu{' '}
            {SYMPTOM_LABELS[single.symptom].toLowerCase()}.
          </Text>
          <Text style={styles.reference}>
            {formatBRDate(single.mealDate)} — {MEAL_TYPE_LABELS[single.mealType]}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.description}>
            Você já registrou alguns desses alimentos em refeições em que sentiu dor:
          </Text>
          <View style={styles.list}>
            {matches.map((match) => (
              <Text key={match.food} style={styles.listItem}>
                • {match.food} — {SYMPTOM_LABELS[match.symptom]}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fbe4e2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3c6c2',
    padding: 14,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#c0392b',
  },
  description: {
    fontSize: 13,
    color: '#7a2018',
    lineHeight: 18,
  },
  reference: {
    fontSize: 12,
    color: '#a33f37',
  },
  list: {
    gap: 4,
  },
  listItem: {
    fontSize: 13,
    color: '#7a2018',
  },
});
