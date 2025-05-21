
import { SQLiteProvider } from "expo-sqlite";
import ProductList from "./components/product-list";

export default function App() {
  return (
    <SQLiteProvider databaseName="beauty.db">
      <ProductList />
    </SQLiteProvider>
  );
}