import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { Picker } from "@react-native-picker/picker";

// Potrebno je proslediti ID proizvoda koji se menja
const EditProductForm = ({ productId, onSaved }) => {
  const db = useSQLiteContext();

  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    brand_id: "",
    category_id: "",
    usage: "",
    notes: "",
    image: "",
    price: "",
    quantity: "",
    rate: "",
    date: new Date().toISOString(),
  });

  const [customBrand, setCustomBrand] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [product] = await db.getAllAsync(
          "SELECT * FROM products WHERE id = ?",
          [productId]
        );
        if (product) {
          setForm(product);
          setStars(Number(product.rate));
        }

        const brandResult = await db.getAllAsync("SELECT id, name FROM brands");
        const categoryResult = await db.getAllAsync(
          "SELECT id, name FROM categories"
        );
        setBrands(brandResult);
        setCategories(categoryResult);
      } catch (error) {
        console.error("Error loading data:", error);
        Alert.alert("Error", "Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [productId]);

  const handleSave = async () => {
    try {
      if (!form.name || !form.price || !stars) {
        throw new Error("Name, Price, and Rate are required fields.");
      }

      if (form.brand_id === "custom" && customBrand.trim()) {
        const res = await db.runAsync("INSERT INTO brands (name) VALUES (?)", [
          customBrand,
        ]);
        form.brand_id = res.lastInsertRowId;
      }

      if (form.category_id === "custom" && customCategory.trim()) {
        const res = await db.runAsync(
          "INSERT INTO categories (name) VALUES (?)",
          [customCategory]
        );
        form.category_id = res.lastInsertRowId;
      }

      form.rate = stars.toString();

      await db.runAsync(
        `UPDATE products
         SET name = ?, brand_id = ?, category_id = ?, usage = ?, notes = ?, image = ?, price = ?, quantity = ?, rate = ?, date = ?
         WHERE id = ?`,
        [
          form.name,
          form.brand_id,
          form.category_id,
          form.usage,
          form.notes,
          form.image,
          form.price,
          form.quantity,
          form.rate,
          form.date,
          productId,
        ]
      );

      Alert.alert("Success", "Product updated successfully!");
      onSaved?.(); // opcionalni callback
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", error.message || "Failed to update product.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <EditProductForm productId={42} onSaved={() => navigation.goBack()} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={form.price}
        onChangeText={(text) => setForm({ ...form, price: text })}
      />

      <Text style={styles.label}>Brand</Text>
      <Picker
        selectedValue={form.brand_id}
        onValueChange={(value) => setForm({ ...form, brand_id: value })}
      >
        {brands.map((b) => (
          <Picker.Item key={b.id} label={b.name} value={b.id} />
        ))}
        <Picker.Item label="Add new brand..." value="custom" />
      </Picker>
      {form.brand_id === "custom" && (
        <TextInput
          style={styles.input}
          placeholder="New Brand Name"
          value={customBrand}
          onChangeText={setCustomBrand}
        />
      )}

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={form.category_id}
        onValueChange={(value) => setForm({ ...form, category_id: value })}
      >
        {categories.map((c) => (
          <Picker.Item key={c.id} label={c.name} value={c.id} />
        ))}
        <Picker.Item label="Add new category..." value="custom" />
      </Picker>
      {form.category_id === "custom" && (
        <TextInput
          style={styles.input}
          placeholder="New Category Name"
          value={customCategory}
          onChangeText={setCustomCategory}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Usage"
        value={form.usage}
        onChangeText={(text) => setForm({ ...form, usage: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={form.notes}
        onChangeText={(text) => setForm({ ...form, notes: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URI"
        value={form.image}
        onChangeText={(text) => setForm({ ...form, image: text })}
      />

      <Text style={styles.label}>Rate</Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity
            key={n}
            onPress={() => {
              setStars(n);
              setForm({ ...form, rate: n.toString() });
            }}
          >
            <Text style={{ fontSize: 30, marginHorizontal: 3 }}>
              {n <= stars ? "★" : "☆"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

export default EditProductForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
