import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MealForm } from "../../components/MealForm";
import { COLORS } from "../../constants/theme";
import { useCreateMealMutation } from "../../hooks/useMeals";
import { styles } from "./createMeal.styles";
import type { CreateMealScreenProps } from "./createMeal.interfaces";
import type { MealInput } from "../../types/meal";

export function CreateMealScreen({ navigation }: CreateMealScreenProps) {
  const createMeal = useCreateMealMutation();

  function handleSubmit(input: MealInput) {
    createMeal.mutate(input, {
      onSuccess: () => navigation.goBack(),
      onError: () =>
        Alert.alert(
          "Não foi possível salvar sua refeição",
          "Verifique sua conexão e tente novamente.",
        ),
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Nova Refeição</Text>
          <Text style={styles.subtitle}>
            Registre o que você comeu e como se sentiu
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
      <MealForm
        submitLabel="Salvar Refeição"
        submitting={createMeal.isPending}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
}
