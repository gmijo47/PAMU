import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: Colors[colorScheme ?? "light"].tint,
        drawerInactiveTintColor: Colors[colorScheme ?? "light"].icon,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "Aplikacija", drawerLabel: "Početne sekcije" }}
      />
      <Drawer.Screen
        name="settings"
        options={{ title: "Postavke", drawerLabel: "Postavke" }}
      />
    </Drawer>
  );
}
