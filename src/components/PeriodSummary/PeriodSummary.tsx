import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  SYMPTOM_BACKGROUND_COLORS,
  SYMPTOM_COLORS,
  SYMPTOM_LABELS,
  SYMPTOM_ORDER,
} from "../../constants/labels";
import { styles } from "./periodSummary.styles";
import type { PeriodSummaryProps } from "./periodSummary.interfaces";

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
          <Text style={styles.totalPillText}>
            {totalFoods} alimentos registrados
          </Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        {SYMPTOM_ORDER.map((symptom) => {
          const count = meals.filter((meal) => meal.symptom === symptom).length;
          return (
            <View
              key={symptom}
              style={[
                styles.statBox,
                { backgroundColor: SYMPTOM_BACKGROUND_COLORS[symptom] },
              ]}
            >
              <Text
                style={[styles.statValue, { color: SYMPTOM_COLORS[symptom] }]}
              >
                {count}
              </Text>
              <Text
                style={[styles.statLabel, { color: SYMPTOM_COLORS[symptom] }]}
              >
                {SYMPTOM_LABELS[symptom]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
