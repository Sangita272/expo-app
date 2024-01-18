import React,{useEffect,useState} from 'react';
import { StatusBar, Text, View, SafeAreaView, ScrollView, Image,RefreshControl,ActivityIndicator } from "react-native";
import Footer from '../components/shared/Footer';
import { LinearGradient } from "expo-linear-gradient";
import Featured from "../components/sections/Featured";

import { apiService } from '../services/api';
import Loader from '../components/shared/Loader';

const PostScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [posts,setPosts] = useState([]);

  const postAllData = {
    title:"Posts",
    subdata: posts
  }

  useEffect(()=>{
    async function postData() {
      try {
        const result = await apiService("post/list",undefined,'get');
        if (result.docs) {
          setPosts(
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
          console.log("post list message", result.message);
        }
      } catch (error) {
        console.log("Error post list catch", error.message);
      }
    }
    postData();
  },[refreshing || ''])
  //console.log('posts',posts)

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
          <Text>post</Text>
         </View>
        </ScrollView>
        <Footer data={route.params.footerData} navigation={navigation} route={route} />
      </SafeAreaView>
    </>
  );
};

export default PostScreen;