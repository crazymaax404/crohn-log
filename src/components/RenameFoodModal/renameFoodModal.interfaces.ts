export interface RenameFoodModalProps {
  visible: boolean;
  initialValue: string;
  submitting: boolean;
  onCancel: () => void;
  onConfirm: (newValue: string) => void;
}
