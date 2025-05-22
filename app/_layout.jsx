import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="beauty.db">
      <Slot />
    </SQLiteProvider>
  );
}
