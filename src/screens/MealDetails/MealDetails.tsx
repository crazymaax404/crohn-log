import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MealForm } from "../../components/MealForm";
import { COLORS } from "../../constants/theme";
import {
  AMOUNT_LABELS,
  MEAL_TYPE_LABELS,
  SYMPTOM_BACKGROUND_COLORS,
  SYMPTOM_COLORS,
  SYMPTOM_ICONS,
  SYMPTOM_LABELS,
} from "../../constants/labels";
import {
  useDeleteMealMutation,
  useMealsQuery,
  useUpdateMealMutation,
} from "../../hooks/useMeals";
import { formatFullDate } from "../../utils/date";
import { styles } from "./mealDetails.styles";
import type { MealDetailsScreenProps } from "./mealDetails.interfaces";
import type { MealInput } from "../../types/meal";

export function MealDetailsScreen({
  route,
  navigation,
}: MealDetailsScreenProps) {
  const { mealId } = route.params;
  const mealsQuery = useMealsQuery();
  const updateMeal = useUpdateMealMutation();
  const deleteMeal = useDeleteMealMutation();
  const [isEditing, setIsEditing] = useState(false);

  const meal = mealsQuery.data?.find((item) => item.id === mealId);

  if (!meal) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerMessage}>
          <Text style={styles.messageText}>Refeição não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  function handleUpdate(input: MealInput) {
    updateMeal.mutate(
      { id: mealId, input },
      {
        onSuccess: () => navigation.goBack(),
        onError: () =>
          Alert.alert(
            "Não foi possível salvar sua refeição",
            "Verifique sua conexão e tente novamente.",
          ),
      },
    );
  }

  function handleDelete() {
    Alert.alert("Excluir refeição?", "Essa ação não poderá ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () =>
          deleteMeal.mutate(mealId, {
            onSuccess: () => navigation.goBack(),
            onError: () =>
              Alert.alert(
                "Não foi possível excluir",
                "Verifique sua conexão e tente novamente.",
              ),
          }),
      },
    ]);
  }

  if (isEditing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Editar refeição</Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsEditing(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
        <MealForm
          initialMeal={meal}
          excludeMealId={meal.id}
          submitLabel="Salvar alterações"
          submitting={updateMeal.isPending}
          onSubmit={handleUpdate}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="restaurant" size={20} color={COLORS.primary} />
          <Text style={styles.title}>{MEAL_TYPE_LABELS[meal.mealType]}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.dateBox}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
          <Text style={styles.dateBoxText}>
            {formatFullDate(meal.mealDate)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>QUANTIDADE INGERIDA</Text>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{AMOUNT_LABELS[meal.amount]}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>O QUE COMEU</Text>
          <View style={styles.foodsBox}>
            {meal.foods.map((food) => (
              <View key={food} style={styles.foodRow}>
                <View style={styles.foodDot} />
                <Text style={styles.foodText}>{food}</Text>
              </View>
            ))}
          </View>
        </View>

        {meal.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>OBSERVAÇÕES</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{meal.notes}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>COMO FICOU APÓS A REFEIÇÃO</Text>
          <View
            style={[
              styles.symptomPill,
              {
                backgroundColor: SYMPTOM_BACKGROUND_COLORS[meal.symptom],
                borderColor: SYMPTOM_COLORS[meal.symptom],
              },
            ]}
          >
            <Ionicons
              name={SYMPTOM_ICONS[meal.symptom]}
              size={18}
              color={SYMPTOM_COLORS[meal.symptom]}
            />
            <Text
              style={[
                styles.symptomPillText,
                { color: SYMPTOM_COLORS[meal.symptom] },
              ]}
            >
              {SYMPTOM_LABELS[meal.symptom]}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => setIsEditing(true)}
          >
            <Ionicons name="pencil" size={16} color={COLORS.textPrimary} />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={16} color="#c0392b" />
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
