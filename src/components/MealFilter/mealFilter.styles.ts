import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  row: {
    gap: 10,
    paddingVertical: 2,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
  },
  chipSelected: {
    backgroundColor: COLORS.selectedDark,
    borderColor: COLORS.selectedDark,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  chipLabelSelected: {
    color: COLORS.surface,
  },
  chipCount: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    overflow: "hidden",
  },
  chipCountSelected: {
    color: COLORS.surface,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});
