import 'react-native-gesture-handler';
import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, Button, Pressable, Platform, StyleSheet, TextInput, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SheetProvider } from 'react-native-actions-sheet';
import { SheetManager } from 'react-native-actions-sheet';
import "./Sheets";
import { Feather } from "@expo/vector-icons";
import useRegisterFont from "./src/hooks/useRegisterFont";
import { navigationRef, navigate, goBack } from "./RootNavigation";
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from "./src/pages/HomeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import BookDetailsScreen from './src/pages/BookDetailsScreen';
import PostDetailsScreen from './src/pages/PostDetailsScreen';
import SearchScreen from "./src/pages/SearchScreen";
import PostScreen from './src/pages/PostScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {  

  const footerData = [
    {
      _id: 1,
      name: "Home",
      icon: "home",
      route: "HomeScreen",
    },
    // {
    //   _id: 2,
    //   name: "Search", 
    //   icon: "search",
    //   route: "SearchScreen",
    // },
    {
      _id: 3,
      name: "Books",
      icon: "book",
      route: "BookDetailsScreen",
    },
    {
      _id: 4,
      name: "Posts",
      icon: "images",
      route: "PostScreen",
    },
    // {
    //   _id: 4,
    //   name: "Profile",
    //   icon: "person",
    //   route: "",
    // },
  ]

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;

  const fontLoaded = useRegisterFont();
  if (!fontLoaded) {
    return null;
  }

  function Root({ navigation }) {
    return (
      <Drawer.Navigator 
      initialRouteName="LandingScreen"
      screenOptions={{
        drawerStyle: {
          width: "90%",
        },
        headerTintColor: '#000000',
        headerShadowVisible: true,
        headerTitleAlign: "center",
        headerTitle: () => (
          <Text className="text-base uppercase text-slate-900" style={{ fontFamily: 'Laila-Bold' }}>My Expo App</Text>
        ),
        headerBackground: () => (
          <View className="flex-1">
            <LinearGradient
              colors={['#ffffff', '#ffffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="flex-1"
            />
          </View>
        ),
        headerRight: () => ("")
      }}>
      <Drawer.Screen
        title="Home"
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{ footerData: footerData }}
        options={{
          drawerIcon: ({ focused }) => (
            <View className={"w-12 h-12 rounded-full items-center justify-center bg-slate-100 mr-0"}>
              <Feather name={'home'} size={20} color={"#4B535B"} />
            </View>
          ),
          drawerLabel: ({ focused }) => (
            <View className={"-ml-4"}>
              <Text className="text-base text-slate-600" style={{ fontFamily: 'Inter-Medium' }}>Home</Text>
            </View>
          ),
          drawerItemStyle: {
            borderTopColor: "#F0F4F6",
            borderTopWidth: 0,
            marginVertical: 0,
            paddingVertical: 0,
            borderRadius: 6,
          }
        }}
      />
      <Drawer.Screen
        name="BookDetailsScreen"
        component={BookDetailsScreen}
        initialParams={{ footerData: footerData }}
        options={{
          drawerIcon: ({ focused }) => (
            <View className={"w-12 h-12 rounded-full items-center justify-center bg-slate-100 mr-0"}>
              <Feather name={'book'} size={20} color={"#4B535B"} />
            </View>
          ),
          drawerLabel: ({ focused }) => (
            <View className={"-ml-4"}>
              <Text className="text-base text-slate-600" style={{ fontFamily: 'Inter-Medium' }}>Books</Text>
            </View>
          ),
          drawerItemStyle: {
            borderTopColor: "#F0F4F6",
            borderTopWidth: 1,
            marginVertical: 0,
            paddingVertical: 0,
            borderRadius: 6,
          }
        }}
      />
      {/* <Drawer.Screen
        name="SearchScreen"
        component={SearchScreen}
        initialParams={{ footerData: footerData }}
      /> */}
      <Drawer.Screen
        name="PostScreen"
        component={PostScreen}
        initialParams={{ footerData: footerData }}
        options={{
          drawerIcon: ({ focused }) => (
            <View className={"w-12 h-12 rounded-full items-center justify-center bg-slate-100 mr-0"}>
              <Feather name={'image'} size={20} color={"#4B535B"} />
            </View>
          ),
          drawerLabel: ({ focused }) => (
            <View className={"-ml-4"}>
              <Text className="text-base text-slate-600" style={{ fontFamily: 'Inter-Medium' }}>Posts</Text>
            </View>
          ),
          drawerItemStyle: {
            borderTopColor: "#F0F4F6",
            borderTopWidth: 1,
            marginVertical: 0,
            paddingVertical: 0,
            borderRadius: 6,
          }
        }}
      />      
      </Drawer.Navigator>
    )
  }

  return (
    <>
      <SheetProvider>      
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="Root"
                component={Root}
                options={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Screen
              name="PostDetailsScreen"
              component={PostDetailsScreen}
              initialParams={{ footerData: footerData }}
              options={{ 
                title: 'Post Details',
                headerBackground: () => (
                  <View className="flex-1">
                    <LinearGradient
                      colors={['#ffffff', '#fff']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      className="flex-1"
                    />
                  </View>
                ),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SheetProvider>

    </>
  );
}

