import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fbe4e2",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f3c6c2",
    padding: 14,
    gap: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#c0392b",
  },
  description: {
    fontSize: 13,
    color: "#7a2018",
    lineHeight: 18,
  },
  reference: {
    fontSize: 12,
    color: "#a33f37",
  },
  list: {
    gap: 4,
  },
  listItem: {
    fontSize: 13,
    color: "#7a2018",
  },
});
