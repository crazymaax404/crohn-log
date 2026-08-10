export interface FoodListProps {
  foods: string[];
  onRemove: (food: string) => void;
  onLongPress: (food: string) => void;
}
