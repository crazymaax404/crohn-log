import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { styles } from "./renameFoodModal.styles";
import type { RenameFoodModalProps } from "./renameFoodModal.interfaces";

export function RenameFoodModal({
  visible,
  initialValue,
  submitting,
  onCancel,
  onConfirm,
}: RenameFoodModalProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (visible) setValue(initialValue);
  }, [visible, initialValue]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Renomear alimento</Text>

          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            autoFocus
            placeholder="Nome do alimento"
            placeholderTextColor={COLORS.placeholder}
          />

          <View style={styles.warningBox}>
            <Ionicons name="information-circle" size={16} color="#a16207" />
            <Text style={styles.warningText}>
              Essa alteração também vai atualizar o nome desse alimento em todas
              as refeições anteriores em que ele aparece.
            </Text>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={submitting}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => onConfirm(value)}
              disabled={submitting}
            >
              <Text style={styles.confirmButtonText}>
                {submitting ? "Salvando..." : "Salvar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
