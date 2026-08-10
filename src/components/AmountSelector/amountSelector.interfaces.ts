import type { Amount } from "../../types/meal";

export interface AmountSelectorProps {
  value: Amount;
  onChange: (amount: Amount) => void;
}
