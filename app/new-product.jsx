import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { initDB, addProduct } from "../lib/db";
import { useEffect, useState } from "react";

const NewProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    rate: "",
  });
  useEffect(() => {
    initDB();
  }, []);

  const handleAddProduct = () => {
    const { name, price, rate } = product;
    if (name && price && rate) {
      addProduct(name, price, 1, rate, new Date().toISOString());
      setProduct({ name: "", price: "", rate: "", date: "" });
    } else {
      alert("Please fill all fields");
    }
  };
  return (
    <View>
      <Text>Add Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.input}
        placeholder="Product Rate"
        placeholderTextColor="#000"
      />
      <TouchableOpacity>
        <Text onPress={handleAddProduct}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NewProduct;
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: "80%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "lightpink",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  link: {
    color: "blue",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
