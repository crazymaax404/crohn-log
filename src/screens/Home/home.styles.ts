import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  appTag: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  appTagText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.surface,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    padding: 20,
    gap: 12,
  },
  listHeader: {
    gap: 14,
    marginBottom: 6,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textSecondary,
    marginTop: 10,
    marginBottom: 10,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  centerMessage: {
    padding: 24,
    alignItems: "center",
  },
  messageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
