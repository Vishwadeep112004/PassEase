import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  navigation: NavigationProp<any>;
};

const Content_on_the_landing_page: React.FC<Props> = ({ navigation }) => {
  return (

    <LinearGradient 
    colors={['#2980B9','#89253e']}  // Gradient colors
    style={styles.overlay}
            >
      <View style={styles.image_text}>
        <Image source={require("../app/images/img.png")} style={styles.image} />
      </View>
      <View style={styles.btnBox}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Login As User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("adminlogin")}>
          <Text style={styles.buttonText}>Login As Authority</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>  );
};
export default Content_on_the_landing_page;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image_text: {
    marginTop: "-17%",
    height: 400,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "80%",
    width: "80%",
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#FF3B3B",
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    height: 55,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnBox: {
    marginTop: 25,
  },
});
