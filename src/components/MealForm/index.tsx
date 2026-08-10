import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMemo, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AmountSelector } from '../AmountSelector';
import { MealTypeSelector } from '../MealTypeSelector';
import { SymptomSelector } from '../SymptomSelector';
import { FoodInput } from '../FoodInput';
import { FoodList } from '../FoodList';
import { FoodWarningModal } from '../FoodWarningModal';
import { COLORS } from '../../constants/theme';
import { QUICK_FOOD_SUGGESTIONS } from '../../constants/foods';
import { normalizeFood, isBlankFood } from '../../utils/foodNormalizer';
import { dateToISODate, formatBRDate, isoDateToDate, todayISODate } from '../../utils/date';
import { useFoodPainHistoryCheck } from '../../hooks/useFoodPainHistory';
import type { Amount, Meal, MealInput, MealType, PainHistoryMatch, Symptom } from '../../types/meal';

interface MealFormProps {
  initialMeal?: Meal;
  excludeMealId?: string;
  submitLabel: string;
  submitting: boolean;
  onSubmit: (input: MealInput) => void;
}

function mergeMatches(existing: PainHistoryMatch[], incoming: PainHistoryMatch[]): PainHistoryMatch[] {
  const merged = new Map(existing.map((match) => [normalizeFood(match.food), match]));
  incoming.forEach((match) => merged.set(normalizeFood(match.food), match));
  return Array.from(merged.values());
}

export function MealForm({ initialMeal, excludeMealId, submitLabel, submitting, onSubmit }: MealFormProps) {
  const [mealDate, setMealDate] = useState(initialMeal?.mealDate ?? todayISODate());
  const [mealType, setMealType] = useState<MealType>(initialMeal?.mealType ?? 'breakfast');
  const [amount, setAmount] = useState<Amount>(initialMeal?.amount ?? 'normal');
  const [foods, setFoods] = useState<string[]>(initialMeal?.foods ?? []);
  const [foodInputValue, setFoodInputValue] = useState('');
  const [notes, setNotes] = useState(initialMeal?.notes ?? '');
  const [symptom, setSymptom] = useState<Symptom>(initialMeal?.symptom ?? 'well');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pendingMatches, setPendingMatches] = useState<PainHistoryMatch[]>([]);
  const [warningVisible, setWarningVisible] = useState(false);

  const checkHistory = useFoodPainHistoryCheck();

  const suggestions = useMemo(
    () => QUICK_FOOD_SUGGESTIONS.filter((food) => !foods.some((added) => normalizeFood(added) === normalizeFood(food))),
    [foods],
  );

  function handleAddFood(rawFood: string) {
    if (isBlankFood(rawFood)) return;
    const trimmed = rawFood.trim();
    const normalized = normalizeFood(trimmed);
    if (foods.some((food) => normalizeFood(food) === normalized)) {
      setFoodInputValue('');
      return;
    }

    setFoods((prev) => [...prev, trimmed]);
    setFoodInputValue('');

    checkHistory.mutate(
      { foods: [trimmed], excludeMealId },
      {
        onSuccess: (matches) => {
          if (matches.length === 0) return;
          setPendingMatches((prev) => mergeMatches(prev, matches));
          setWarningVisible(true);
        },
      },
    );
  }

  function handleRemoveFood(food: string) {
    setFoods((prev) => prev.filter((item) => item !== food));
  }

  function handleCloseWarning() {
    setWarningVisible(false);
    setPendingMatches([]);
  }

  function handleDateChange(_event: unknown, selectedDate?: Date) {
    setShowDatePicker(false);
    if (selectedDate) {
      setMealDate(dateToISODate(selectedDate));
    }
  }

  function handleSubmit() {
    if (foods.length === 0) {
      Alert.alert('Adicione pelo menos um alimento', 'Informe o que você comeu antes de salvar.');
      return;
    }

    onSubmit({
      mealType,
      amount,
      foods,
      symptom,
      notes: notes.trim().length > 0 ? notes.trim() : null,
      mealDate,
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
          <Text style={styles.sectionLabel}>DATA DA REFEIÇÃO</Text>
        </View>
        <TouchableOpacity style={styles.dateBox} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{formatBRDate(mealDate)}</Text>
          <Ionicons name="calendar" size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={isoDateToDate(mealDate)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="restaurant-outline" size={16} color={COLORS.primary} />
          <Text style={styles.sectionLabel}>QUAL REFEIÇÃO?</Text>
        </View>
        <MealTypeSelector value={mealType} onChange={setMealType} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>QUANTO COMEU?</Text>
        <AmountSelector value={amount} onChange={setAmount} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderSpaced}>
          <Text style={styles.sectionLabel}>O QUE VOCÊ COMEU?</Text>
          <Text style={styles.itemCount}>{foods.length} ITENS</Text>
        </View>
        <FoodList foods={foods} onRemove={handleRemoveFood} />
        <FoodInput
          value={foodInputValue}
          onChangeText={setFoodInputValue}
          onAdd={() => handleAddFood(foodInputValue)}
          suggestions={suggestions}
          onAddSuggestion={handleAddFood}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderSpaced}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text-outline" size={16} color={COLORS.primary} />
            <Text style={styles.sectionLabel}>OBSERVAÇÕES</Text>
          </View>
          <Text style={styles.itemCount}>OPCIONAL</Text>
        </View>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Ex: Tinha cebola e alho na carne, molho muito apimentado..."
          placeholderTextColor={COLORS.placeholder}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>COMO VOCÊ FICOU APÓS A REFEIÇÃO?</Text>
        <SymptomSelector value={symptom} onChange={setSymptom} />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={styles.submitButtonText}>{submitting ? 'Salvando...' : submitLabel}</Text>
      </TouchableOpacity>

      <FoodWarningModal visible={warningVisible} matches={pendingMatches} onClose={handleCloseWarning} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 22,
  },
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionHeaderSpaced: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  itemCount: {
    fontSize: 12,
    color: COLORS.placeholder,
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
  },
  dateText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 16,
  },
});
