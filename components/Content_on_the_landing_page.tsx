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

      <View style={styles.chatContainer}>
          <View style={styles.chatMessageBubble}>
            <Text style={styles.chatMessageText}>Hey! I am PassEase Chatbot</Text>
          </View>

          <TouchableOpacity
            style={styles.chatBubble}
            onPress={() => navigation.navigate("ChatBot_01")}
          >
            <Image
              source={require("../assets/images/bot.jpeg")}
              style={styles.chatImage}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>  );
};
export default Content_on_the_landing_page;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "black",
//   },
//   image_text: {
//     marginTop: "-17%",
//     height: 400,
//     width: 400,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     height: "80%",
//     width: "80%",
//     resizeMode: "contain",
//   },
//   button: {
//     backgroundColor: "#FF3B3B",
//     padding: 10,
//     borderRadius: 10,
//     width: 200,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 15,
//     height: 55,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   btnBox: {
//     marginTop: 25,
//   },
// });
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image_text: {
    height: 400,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 50,
    height: "80%",
    width: "80%",
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#FF3B3B",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1.5,
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
    marginBottom: '50%',
  },
  chatContainer: {
    position: "absolute",
    bottom: 30,
    right: 25,
    alignItems: "flex-end",
  },

  chatMessageBubble: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginBottom: 5,
    maxWidth: 220,
    borderBottomRightRadius: 0, // makes it more "speech-bubble" shaped
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },

  chatMessageText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },

  chatBubble: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 10,
  },

  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },

});