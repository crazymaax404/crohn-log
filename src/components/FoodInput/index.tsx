import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface FoodInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
  suggestions: string[];
  onAddSuggestion: (food: string) => void;
}

export function FoodInput({ value, onChangeText, onAdd, suggestions, onAddSuggestion }: FoodInputProps) {
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
              <TouchableOpacity key={food} style={styles.chip} onPress={() => onAddSuggestion(food)}>
                <Text style={styles.chipText}>+ {food}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addButtonText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 14,
  },
  suggestions: {
    marginTop: 14,
  },
  suggestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  suggestionsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
});
