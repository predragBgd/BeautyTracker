import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { FlatList, View, Text } from "react-native";

const ProductList = () => {
  const db = useSQLiteContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const result = await db.getAllAsync(`
        SELECT * FROM products
        ORDER BY date DESC
      `);
      setProducts(result);
    });
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name</Text>
        <Text>{item.name}</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Price</Text>
        <Text>{item.name} - {item.price} RSD</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Rate</Text>
        <Text>{item.rate}</Text>

        </View>
      )}
    />
  );
};

export default ProductList;

