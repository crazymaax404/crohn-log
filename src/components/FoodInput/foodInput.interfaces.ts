export interface FoodInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
  suggestions: string[];
  onAddSuggestion: (food: string) => void;
}
