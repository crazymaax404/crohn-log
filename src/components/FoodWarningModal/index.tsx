import { Ionicons } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { MEAL_TYPE_LABELS, SYMPTOM_LABELS } from '../../constants/labels';
import { formatBRDate } from '../../utils/date';
import type { PainHistoryMatch } from '../../types/meal';

interface FoodWarningModalProps {
  visible: boolean;
  matches: PainHistoryMatch[];
  onClose: () => void;
}

export function FoodWarningModal({ visible, matches, onClose }: FoodWarningModalProps) {
  if (matches.length === 0) return null;

  const single = matches.length === 1 ? matches[0] : null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Ionicons name="warning" size={20} color="#c0392b" />
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

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  reference: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  list: {
    marginTop: 10,
    gap: 6,
  },
  listItem: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.selectedDark,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 15,
  },
});
