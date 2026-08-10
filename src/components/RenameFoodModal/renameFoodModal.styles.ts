import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(16, 24, 40, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    gap: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  warningBox: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#fdf3d6",
    borderRadius: 10,
    padding: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: "#7a5c05",
    lineHeight: 17,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: COLORS.background,
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontWeight: "700",
  },
  confirmButton: {
    backgroundColor: COLORS.selectedDark,
  },
  confirmButtonText: {
    color: COLORS.surface,
    fontWeight: "700",
  },
});
