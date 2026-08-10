import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MealForm } from '../../components/MealForm';
import { COLORS } from '../../constants/theme';
import {
  AMOUNT_LABELS,
  MEAL_TYPE_LABELS,
  SYMPTOM_BACKGROUND_COLORS,
  SYMPTOM_COLORS,
  SYMPTOM_ICONS,
  SYMPTOM_LABELS,
} from '../../constants/labels';
import { useDeleteMealMutation, useMealsQuery, useUpdateMealMutation } from '../../hooks/useMeals';
import { formatFullDate } from '../../utils/date';
import type { RootStackParamList } from '../../navigation/AppNavigation';
import type { MealInput } from '../../types/meal';

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetails'>;

export function MealDetailsScreen({ route, navigation }: Props) {
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
          Alert.alert('Não foi possível salvar sua refeição', 'Verifique sua conexão e tente novamente.'),
      },
    );
  }

  function handleDelete() {
    Alert.alert('Excluir refeição?', 'Essa ação não poderá ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () =>
          deleteMeal.mutate(mealId, {
            onSuccess: () => navigation.goBack(),
            onError: () =>
              Alert.alert('Não foi possível excluir', 'Verifique sua conexão e tente novamente.'),
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
          <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.closeButton}>
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.dateBox}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
          <Text style={styles.dateBoxText}>{formatFullDate(meal.mealDate)}</Text>
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
              { backgroundColor: SYMPTOM_BACKGROUND_COLORS[meal.symptom], borderColor: SYMPTOM_COLORS[meal.symptom] },
            ]}
          >
            <Ionicons name={SYMPTOM_ICONS[meal.symptom]} size={18} color={SYMPTOM_COLORS[meal.symptom]} />
            <Text style={[styles.symptomPillText, { color: SYMPTOM_COLORS[meal.symptom] }]}>
              {SYMPTOM_LABELS[meal.symptom]}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => setIsEditing(true)}>
            <Ionicons name="pencil" size={16} color={COLORS.textPrimary} />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
            <Ionicons name="trash" size={16} color="#c0392b" />
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 20,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dateBoxText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  foodsBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  foodDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  foodText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  notesBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 14,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  symptomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  symptomPillText: {
    fontSize: 16,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 12,
    paddingVertical: 14,
  },
  editButton: {
    backgroundColor: COLORS.background,
  },
  editButtonText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: '#fbe4e2',
  },
  deleteButtonText: {
    color: '#c0392b',
    fontWeight: '700',
  },
  centerMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
