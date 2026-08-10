import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  symptomBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  symptomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  symptomLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  amountTag: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  amountText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  foodsBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  foodsLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.placeholder,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  foodItem: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
});
