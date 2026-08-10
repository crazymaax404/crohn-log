import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { MEAL_TYPE_LABELS, SYMPTOM_LABELS } from "../../constants/labels";
import { formatBRDate } from "../../utils/date";
import { styles } from "./foodPainHistoryCard.styles";
import type { FoodPainHistoryCardProps } from "./foodPainHistoryCard.interfaces";

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
            Você já registrou "{single.food}" em uma refeição em que sentiu{" "}
            {SYMPTOM_LABELS[single.symptom].toLowerCase()}.
          </Text>
          <Text style={styles.reference}>
            {formatBRDate(single.mealDate)} —{" "}
            {MEAL_TYPE_LABELS[single.mealType]}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.description}>
            Você já registrou alguns desses alimentos em refeições em que sentiu
            dor:
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
