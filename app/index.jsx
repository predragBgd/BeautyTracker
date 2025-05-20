import { Link } from "expo-router";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeScreen}>
        <Text style={styles.text}>Beauty Tracker and Budget</Text>
        <View>
          <TouchableOpacity style={styles.button}>
            <Link href="/products">Products</Link>
            <Link href="/new-product">ADD PRODUCT</Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Tretmants</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Budget Review</Text>
          </TouchableOpacity>
          <Link href="/privacy" asChild>
            <Text style={styles.link}>Privacy</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "gray",
  },
  welcomeScreen: {
    flex: 1,
    marginTop: 200,
    paddingTop: 50,
    backgroundColor: "lightpink",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: 50,
    fontWeight: "600",
    color: "#fff",
    top: "-2",
    left: "-2",
    textShadowOffset: { width: 1, height: 1 },
    marginBottom: 50,
  },
  input: {
    height: 40,
    width: 300,
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    color: "white",
    marginTop: 20,
    width: 300,
    height: 40,
    backgroundColor: "lightgreen",
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "blue",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,

    alignSelf: "flex-start",
  },
});
