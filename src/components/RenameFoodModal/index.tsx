import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface RenameFoodModalProps {
  visible: boolean;
  initialValue: string;
  submitting: boolean;
  onCancel: () => void;
  onConfirm: (newValue: string) => void;
}

export function RenameFoodModal({ visible, initialValue, submitting, onCancel, onConfirm }: RenameFoodModalProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (visible) setValue(initialValue);
  }, [visible, initialValue]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
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
              Essa alteração também vai atualizar o nome desse alimento em todas as refeições
              anteriores em que ele aparece.
            </Text>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel} disabled={submitting}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => onConfirm(value)}
              disabled={submitting}
            >
              <Text style={styles.confirmButtonText}>{submitting ? 'Salvando...' : 'Salvar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    gap: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
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
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#fdf3d6',
    borderRadius: 10,
    padding: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#7a5c05',
    lineHeight: 17,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.background,
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  confirmButton: {
    backgroundColor: COLORS.selectedDark,
  },
  confirmButtonText: {
    color: COLORS.surface,
    fontWeight: '700',
  },
});
