import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 20,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dateBoxText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  foodsBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  foodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  foodDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  foodText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  notesBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 14,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  notesPlaceholder: {
    fontSize: 13,
    color: COLORS.placeholder,
    fontStyle: "italic",
  },
  symptomPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  symptomPillText: {
    fontSize: 16,
    fontWeight: "700",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 12,
    paddingVertical: 14,
  },
  editButton: {
    backgroundColor: COLORS.background,
  },
  editButtonText: {
    color: COLORS.textPrimary,
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: "#fbe4e2",
  },
  deleteButtonText: {
    color: "#c0392b",
    fontWeight: "700",
  },
  centerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
