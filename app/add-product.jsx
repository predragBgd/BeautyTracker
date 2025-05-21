import { Button, StyleSheet, Text, View } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import ProductForm from "./components/product-form";
// import exportDatabase from “./exportDB”;
const AddProduct = () => {
  return (
    <View>
      <Text
      style={{
        textAlign: "center",
        fontFamily: "sans-serif",
        fontSize: 30,
        fontWeight: "600",
        color: "#000",
        top: "-2",
        left: "-2",
        textShadowOffset: { width: 1, height: 1 },
      }}
      >Add Product</Text>
      <SQLiteProvider
        databaseName="beauty.db"
        onInit={async (db) => {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            brand_id INTEGER,
            category_id INTEGER,
            usage TEXT NULL,
            notes TEXT NULL,
            image TEXT NULL, -- URI
            price REAL NOT NULL,
            quantity INTEGER DEFAULT 1,
            rate TEXT NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (brand_id) REFERENCES brands(id),
            FOREIGN KEY (category_id) REFERENCES categories(id)
          );

          CREATE TABLE IF NOT EXISTS brands (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
          );

          CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
          );

          PRAGMA journal_mode=WAL;
          `);
        }}
        
        options={{ useNewConnection: false }}
      >
        <ProductForm />
      </SQLiteProvider>
    </View>
  );
};
export default AddProduct;