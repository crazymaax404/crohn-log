import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MealForm } from '../../components/MealForm';
import { COLORS } from '../../constants/theme';
import { AMOUNT_LABELS, MEAL_TYPE_LABELS, SYMPTOM_LABELS } from '../../constants/labels';
import { useDeleteMealMutation, useMealsQuery, useUpdateMealMutation } from '../../hooks/useMeals';
import { formatFullDate, formatTime } from '../../utils/date';
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
        <Text style={styles.title}>{MEAL_TYPE_LABELS[meal.mealType]}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.dateText}>{formatFullDate(meal.mealDate)}</Text>
        <Text style={styles.timeText}>{formatTime(meal.createdAt)}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Quantidade</Text>
          <Text style={styles.sectionValue}>{AMOUNT_LABELS[meal.amount]}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>O que comeu</Text>
          {meal.foods.map((food) => (
            <Text key={food} style={styles.foodItem}>
              • {food}
            </Text>
          ))}
        </View>

        {meal.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Observações</Text>
            <Text style={styles.sectionValue}>{meal.notes}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Como ficou</Text>
          <Text style={styles.sectionValue}>{SYMPTOM_LABELS[meal.symptom]}</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => setIsEditing(true)}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
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
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
  content: {
    padding: 20,
    gap: 18,
  },
  dateText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  timeText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: -12,
  },
  section: {
    gap: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  sectionValue: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  foodItem: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: COLORS.selectedDark,
  },
  editButtonText: {
    color: COLORS.surface,
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
