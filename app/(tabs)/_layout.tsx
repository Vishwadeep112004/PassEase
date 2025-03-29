import { StyleSheet, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Content_on_the_landing_page from "@/components/Content_on_the_landing_page";
import Content_on_the_login_page from "@/components/Content_on_the_login_page";
import Content_on_the_register_page from "@/components/Content_on_the_register_page";
import Content_on_theDashboard from "@/components/Content_on_theDashboard";
import Content_on_the_Profile from "@/components/Content_on_the_Profile";

const Stack = createStackNavigator();

const Layout = () => {
  return (
    
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Content_on_the_landing_page} />
        <Stack.Screen name="Login" component={Content_on_the_login_page} />
        <Stack.Screen name="Register" component={Content_on_the_register_page} />
        <Stack.Screen name="Dashboard" component={Content_on_theDashboard} />
        <Stack.Screen name="Profile" component={Content_on_the_Profile} />
      </Stack.Navigator>
    
  );
};

export default Layout;

const styles = StyleSheet.create({});
