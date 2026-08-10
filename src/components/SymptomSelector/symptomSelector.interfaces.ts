import type { Symptom } from "../../types/meal";

export interface SymptomSelectorProps {
  value: Symptom;
  onChange: (symptom: Symptom) => void;
}
