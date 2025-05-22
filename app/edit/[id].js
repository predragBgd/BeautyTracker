import EditProductForm from "../components/product-edit";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  return (
    <SQLiteProvider databaseName="beauty.db">
      <EditProductForm
        productId={id}
        onSaved={() => navigation.goBack()}
      />
    </SQLiteProvider>
  );
}

