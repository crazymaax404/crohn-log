import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { styles } from "./searchBar.styles";
import type { SearchBarProps } from "./searchBar.interfaces";

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={16} color={COLORS.placeholder} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar alimento..."
        placeholderTextColor={COLORS.placeholder}
      />
    </View>
  );
}
