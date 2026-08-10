import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  option: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  optionSelected: {
    backgroundColor: COLORS.selectedDark,
    borderColor: COLORS.selectedDark,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  optionLabelSelected: {
    color: COLORS.surface,
  },
});
