import { Link, useRouter } from "expo-router";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

const TopNavigation = () => {
  const router = useRouter();
  return (
    <>
      <Link href="/home">
        <Text
          style={style.link}
          onPress={() => router.push("/")}
        >
          Go to Home
        </Text>
        </Link>
        <Link href="/add-product">
        <Text
          style={style.link}
          onPress={() => router.push("/add-product")}
        >
          Add Product
        </Text>
        </Link>
        <Link href="/products">
        <Text
          style={style.link}
          onPress={() => router.push("/")}
        >
          Product Rating
        </Text>
      </Link>
    </>
  );
};

export default TopNavigation;

const style = StyleSheet.create({
    link:{
        borderWidth: 3,
        borderColor: "blue",
        margin: 20,
        border: "1px solid blue",
        borderRadius: 25,
        padding: 10,
        display: "inline-block",
        fontWeight: "300",
        
    },
    container: {
        margin: 0,
        backgroundColor: "#fff",
      },
      text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        width: 600,
        height: 600,
        display: "inline-block",
        textAlign: "center",
      },
});