import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MealForm } from '../../components/MealForm';
import { COLORS } from '../../constants/theme';
import { useCreateMealMutation } from '../../hooks/useMeals';
import type { RootStackParamList } from '../../navigation/AppNavigation';
import type { MealInput } from '../../types/meal';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateMeal'>;

export function CreateMealScreen({ navigation }: Props) {
  const createMeal = useCreateMealMutation();

  function handleSubmit(input: MealInput) {
    createMeal.mutate(input, {
      onSuccess: () => navigation.goBack(),
      onError: () =>
        Alert.alert('Não foi possível salvar sua refeição', 'Verifique sua conexão e tente novamente.'),
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Nova Refeição</Text>
          <Text style={styles.subtitle}>Registre o que você comeu e como se sentiu</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
      <MealForm submitLabel="Salvar Refeição" submitting={createMeal.isPending} onSubmit={handleSubmit} />
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
    alignItems: 'flex-start',
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
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
