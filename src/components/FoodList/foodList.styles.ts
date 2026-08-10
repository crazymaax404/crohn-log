import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    padding: 12,
    gap: 10,
  },
  placeholder: {
    color: COLORS.placeholder,
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  foodTextWrapper: {
    flex: 1,
    paddingVertical: 2,
  },
  foodText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  hint: {
    fontSize: 11,
    color: COLORS.placeholder,
    marginTop: 6,
  },
});
