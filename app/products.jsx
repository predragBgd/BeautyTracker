
import { SQLiteProvider } from "expo-sqlite";
import ProductList from "./components/product-list";
import TopNavigation from "./components/navigation/top";

export default function App() {
  return (
    <>
    <TopNavigation />
    <SQLiteProvider databaseName="beauty.db">
      <ProductList />
    </SQLiteProvider>
    </>
    );
}