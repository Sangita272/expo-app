import React,{ useEffect,useState } from 'react';
import { StatusBar, Text, View, SafeAreaView, ScrollView, Image,RefreshControl,ActivityIndicator } from "react-native";
import Footer from '../components/shared/Footer';
import { LinearGradient } from "expo-linear-gradient";
import Collections from "../components/sections/Collections";
import MainSlider from "../components/sections/MainSlider";
import Featured from "../components/sections/Featured";

import { apiService } from '../services/api';
import Loader from '../components/shared/Loader';


const HomeScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [banner,setBanner] = useState([]);
  const [books,setBooks] = useState([]);
  const [featured,setFeatured] = useState([]);

  useEffect(()=>{
    async function booksData() {
      try {
        const result = await apiService("book/list?limit=3&status=1",undefined,'get');
        if (result.data) {
          setBooks(
            result.data.docs.map((item)=>{
              return {
                _id : item?._id,
                name : item?.title,
                image:item?.image,
                description: item?.content
              }
            })
          );
        } else {
          console.log("book list message", result.message);
        }
      } catch (error) {
        console.log("Error book list catch", error.message);
      }
    }
    booksData();

    async function featuresData() {
      try {
        const result = await apiService("post/list?limit=5&feature=1&status=1",undefined,'get');
        if (result.docs) {
          setFeatured(
            result.docs.map((item) => {
              return {
                _id : item?._id,
                name : item?.name,
                image:(item?.mediaData)?item?.mediaData[0]?.url:null,
                description: item?.description,
                media : item?.mediaData
              }
            })
          );
        } else {
          console.log("feature collection list message", result.message);
        }
      } catch (error) {
        console.log("Error feature collection list catch", error.message);
      }
    }
    featuresData();

    async function bannerData() {
      try {
        const result = await apiService("post/list?limit=3&isBanner=true&status=1",undefined,'get');
        if (result.docs) {
          //console.log('result',result.docs)
          setBanner(
            result.docs.map((item) => {
              return {
                _id : item?._id,
                name : item?.name,
                image:(item?.mediaData)?item?.mediaData[0]?.url:null,
                description: item?.description,
                media : item?.mediaData
              }
            })
          );
        } else {
          console.log("banner collection list message", result.message);
        }
      } catch (error) {
        console.log("Error banner collection list catch", error.message);
      }
    }
    bannerData();
  },[refreshing || ''])  

  const collectionData = {
    title:"Recent Book",
    subdata:books
  }

  const featuredData = {
    title:"Featured Collection",
    subdata: featured
  }
  //console.log('banner',banner)

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />      
      <SafeAreaView className="w-full h-full">
        <ScrollView 
        className="w-full" 
        nestedScrollEnabled={true} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
         <View>
          <Text>Home</Text>
         </View>
        </ScrollView>
        <Footer data={route.params.footerData} navigation={navigation} route={route} />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;