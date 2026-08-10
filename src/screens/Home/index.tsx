import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MealCard } from '../../components/MealCard';
import { MealFilter, type MealFilterValue } from '../../components/MealFilter';
import { PeriodSummary } from '../../components/PeriodSummary';
import { SearchBar } from '../../components/SearchBar';
import { COLORS } from '../../constants/theme';
import { SYMPTOM_ORDER } from '../../constants/labels';
import { useMealsQuery } from '../../hooks/useMeals';
import { normalizeFood } from '../../utils/foodNormalizer';
import { formatGroupHeader } from '../../utils/date';
import type { Meal } from '../../types/meal';
import type { RootStackParamList } from '../../navigation/AppNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function groupMealsByDate(meals: Meal[]) {
  const groups: { date: string; meals: Meal[] }[] = [];
  const indexByDate = new Map<string, number>();

  for (const meal of meals) {
    let index = indexByDate.get(meal.mealDate);
    if (index === undefined) {
      index = groups.length;
      indexByDate.set(meal.mealDate, index);
      groups.push({ date: meal.mealDate, meals: [] });
    }
    groups[index].meals.push(meal);
  }

  return groups;
}

export function HomeScreen({ navigation }: Props) {
  const mealsQuery = useMealsQuery();
  const meals = mealsQuery.data ?? [];

  const [filter, setFilter] = useState<MealFilterValue>('all');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    const result: Record<MealFilterValue, number> = { all: meals.length, well: 0, discomfort: 0, pain: 0, severe_pain: 0 };
    for (const meal of meals) {
      result[meal.symptom] += 1;
    }
    return result;
  }, [meals]);

  const filteredMeals = useMemo(() => {
    const normalizedSearch = normalizeFood(search);
    return meals.filter((meal) => {
      const matchesFilter = filter === 'all' || meal.symptom === filter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        meal.foods.some((food) => normalizeFood(food).includes(normalizedSearch));
      return matchesFilter && matchesSearch;
    });
  }, [meals, filter, search]);

  const sections = useMemo(
    () => groupMealsByDate(filteredMeals).map((group) => ({ title: group.date, data: group.meals })),
    [filteredMeals],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <Ionicons name="restaurant" size={22} color={COLORS.surface} />
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.headerTitle}>Diário Alimentar</Text>
              <View style={styles.appTag}>
                <Text style={styles.appTagText}>Crohn log</Text>
              </View>
            </View>
            <Text style={styles.headerSubtitle}>{meals.length} refeições registradas</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateMeal')}>
          <Ionicons name="add" size={22} color={COLORS.surface} />
        </TouchableOpacity>
      </View>

      {mealsQuery.isLoading && (
        <View style={styles.centerMessage}>
          <Text style={styles.messageText}>Carregando refeições...</Text>
        </View>
      )}

      {mealsQuery.isError && (
        <View style={styles.centerMessage}>
          <Text style={styles.messageText}>
            Não foi possível carregar suas refeições. Verifique sua conexão e tente novamente.
          </Text>
        </View>
      )}

      {!mealsQuery.isLoading && !mealsQuery.isError && (
        <SectionList
          sections={sections}
          keyExtractor={(meal) => meal.id}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <PeriodSummary meals={meals} />
              <SearchBar value={search} onChangeText={setSearch} />
              <MealFilter value={filter} onChange={setFilter} counts={counts} />
            </View>
          }
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{formatGroupHeader(section.title)}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MealCard meal={item} onPress={() => navigation.navigate('MealDetails', { mealId: item.id })} />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.centerMessage}>
              <Text style={styles.messageText}>Nenhuma refeição encontrada.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  appTag: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  appTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.surface,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 20,
    gap: 12,
  },
  listHeader: {
    gap: 14,
    marginBottom: 6,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 10,
    marginBottom: 10,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  centerMessage: {
    padding: 24,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
