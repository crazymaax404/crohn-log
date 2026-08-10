import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { AppNavigation } from "./src/navigation/AppNavigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <AppNavigation />
    </QueryClientProvider>
  );
}
