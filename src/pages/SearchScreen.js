import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

import Footer from '../components/shared/Footer';
import Styles from "../styles/Styles";
import Featured from "../components/sections/Featured";


const SearchScreen = ({ navigation, route }) => {

  const featuredData = {
    title: "",
    subdata: [
      {
        _id: 1,
        name: "Dedicated To Reading",
        image: require('../assets/images/books/book-cover-06.jpg'),
        click: () => { }
      },
      {
        _id: 2,
        name: "World Book Day Celebration",
        image: require('../assets/images/books/book-cover-07.jpg'),
        click: () => { }
      },
      {
        _id: 3,
        name: "Literacy Takes Us New Places",
        image: require('../assets/images/books/book-cover-08.jpg'),
        click: () => { }
      },
      {
        _id: 4,
        name: "Open a Book, Open Up New Ideas",
        image: require('../assets/images/books/book-cover-09.jpg'),
        click: () => { }
      },
      {
        _id: 5,
        name: "Serafina & The Black Cloak",
        image: require('../assets/images/books/book-cover-10.jpg'),
        click: () => { }
      },
      {
        _id: 6,
        name: "Dedicated To Reading",
        image: require('../assets/images/books/book-cover-06.jpg'),
        click: () => { }
      },
      {
        _id: 7,
        name: "World Book Day Celebration",
        image: require('../assets/images/books/book-cover-07.jpg'),
        click: () => { }
      },
      {
        _id: 8,
        name: "Literacy Takes Us New Places",
        image: require('../assets/images/books/book-cover-08.jpg'),
        click: () => { }
      },
      {
        _id: 9,
        name: "Open a Book, Open Up New Ideas",
        image: require('../assets/images/books/book-cover-09.jpg'),
        click: () => { }
      },
      {
        _id: 10,
        name: "Serafina & The Black Cloak",
        image: require('../assets/images/books/book-cover-10.jpg'),
        click: () => { }
      },
    ]
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView className="w-full h-full">
        <ScrollView overScrollMode={'never'} className="w-full" nestedScrollEnabled={true}>
          
            <View className="relative px-4 py-4">
              <Pressable className="relative flex-row items-center flex-grow flex-shrink bg-white h-10 max-h-10 rounded-full flex-1" style={Styles.shadow}>
                <View className="w-10 h-10 items-center justify-center">
                  <Feather name="search" size={16} color="#94a3b8" />
                </View>
                <View className="w-full py-0 px-0 flex-grow flex-shrink bg-transparent">
                  <Text className="text-slate-400 text-sm" style={{ fontFamily: 'Inter-Regular' }}>Search</Text>
                </View>
              </Pressable>
            </View>

            <View className="relative mb-6">
              <Featured data={featuredData} viewType={'grid'} />
            </View>




        </ScrollView>
        <Footer data={route.params.footerData} navigation={navigation} route={route} />
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;