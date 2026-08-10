import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateMealScreen } from '../screens/CreateMeal';
import { HomeScreen } from '../screens/Home';
import { MealDetailsScreen } from '../screens/MealDetails';

export type RootStackParamList = {
  Home: undefined;
  CreateMeal: undefined;
  MealDetails: { mealId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateMeal" component={CreateMealScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="MealDetails" component={MealDetailsScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
