import { StyleSheet, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Content_on_the_landing_page from "@/components/Content_on_the_landing_page";
import Content_on_the_login_page from "@/components/Content_on_the_login_page";
import Content_on_the_register_page from "@/components/Content_on_the_register_page";
import Content_on_theDashboard from "@/components/Content_on_theDashboard";
import ChatBot from "@/components/ChatBot";
import Content_on_the_adminLogin from "@/components/Content_on_the_adminLogin";
import Content_on_adminDashboard from "@/components/Content_on_adminDashboard";
import Chart from "@/components/Chart";
import ChatBot_01 from "@/components/ChatBot_01";

const Stack = createStackNavigator();

const Layout = () => {
  return (
    
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Content_on_the_landing_page} />
        <Stack.Screen name="Login" component={Content_on_the_login_page} />
        <Stack.Screen name="Register" component={Content_on_the_register_page} />
        <Stack.Screen name="Dashboard" component={Content_on_theDashboard} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
        <Stack.Screen name="ChatBot_01" component={ChatBot_01} />
        <Stack.Screen name="adminlogin" component={Content_on_the_adminLogin} />    
        <Stack.Screen name="adminDashboard" component={Content_on_adminDashboard} />   
        <Stack.Screen name="Chart" component={Chart} />      
      </Stack.Navigator>
  );
};

export default Layout;

const styles = StyleSheet.create({});
