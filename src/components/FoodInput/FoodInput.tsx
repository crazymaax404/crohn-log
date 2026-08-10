import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { styles } from "./foodInput.styles";
import type { FoodInputProps } from "./foodInput.interfaces";

export function FoodInput({
  value,
  onChangeText,
  onAdd,
  suggestions,
  onAddSuggestion,
}: FoodInputProps) {
  return (
    <View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Ex: Peixe frito, Arroz, Pão..."
          placeholderTextColor={COLORS.placeholder}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Ionicons name="add" size={18} color={COLORS.surface} />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestions}>
          <View style={styles.suggestionsHeader}>
            <Ionicons name="sparkles" size={14} color={COLORS.primary} />
            <Text style={styles.suggestionsLabel}>SUGESTÕES RÁPIDAS:</Text>
          </View>
          <View style={styles.chips}>
            {suggestions.map((food) => (
              <TouchableOpacity
                key={food}
                style={styles.chip}
                onPress={() => onAddSuggestion(food)}
              >
                <Text style={styles.chipText}>+ {food}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
