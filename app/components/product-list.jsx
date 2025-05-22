import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const ProductList = () => {
  const db = useSQLiteContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const result = await db.getAllAsync(`
        SELECT p.*, 
        b.name AS brand_name, 
        c.name AS category_name 
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.date DESC
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
        <Text style={styles.text}>ID: {item.id}</Text>          
        <Link href={`/edit/${item.id}`}>
          <Text>Edit</Text>
        </Link>
        <Text style={styles.text}
         >Name: </Text>
        <Text style={styles.text}>{item.name} </Text>
        <Text></Text>
        <Text style={styles.text}>Price: </Text>
        <Text style={styles.text}> {item.price} RSD </Text>
        <Text style={styles.text}>Brand: {item.brand_name || "N/A"}</Text>
        <Text style={styles.text}>Category: {item.category_name || "N/A"}</Text>
        <Text style={styles.text}>Rate: </Text>
        <Text style={styles.text}>{item.rate} </Text>
        </View>
      )}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
});