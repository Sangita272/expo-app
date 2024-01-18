import React,{useState,useEffect} from 'react';
import { StatusBar, Text, View, SafeAreaView, ScrollView, Pressable, Image,useWindowDimensions,WebView,RefreshControl} from "react-native";
import RenderHtml from 'react-native-render-html';
import Footer from '../components/shared/Footer';
import { LinearGradient } from 'expo-linear-gradient';
import Styles from "../styles/Styles";
import { apiService } from '../services/api';
import Loader from '../components/shared/Loader';
//import { SliderBox } from "react-native-image-slider-box";
import Swiper from 'react-native-swiper'

const PostDetailsScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);  
  
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    {
        loading ? <Loader/> :
        <SafeAreaView className="w-full h-full">
          <ScrollView 
          className="w-full h-full" 
          stickyHeaderIndices={[0]} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <LinearGradient colors={['#5D3E8E', '#5D3E8E', '#2E1F47']} className="rounded-b-3xl">
              <View className="relative flex-row justify-between px-6 py-4 z-20">
                <View className="w-full relative flex-grow flex-shrink">
                  <Text className="text-2xl text-white" style={{ fontFamily: 'Inter-Bold' }}>{route?.params?.name}</Text>                  
                </View>
                {
                  (route?.params?.media && route?.params?.media.length>1)?
                  <View className="w-28 min-w-[112px] h-40 rounded-md overflow-hidden">
                    <Swiper showsButtons={false} autoplay={true}>
                      {                    
                        route?.params?.media.map((item,index) =>(
                        <View className="w-28 h-40 rounded-md overflow-hidden" style={Styles.shadow} key={index}>
                          <Image source={(item?.url)?{uri:item?.url}:null} resizeMode="cover" className="w-full h-full object-cover" />
                        </View>
                        ))
                      }                  
                    </Swiper>
                  </View>:
                  <View className="w-28 h-40 rounded-md overflow-hidden" style={Styles.shadow}>
                    <Image source={(route?.params?.image)?{uri:route?.params?.image}:null} resizeMode="cover" className="w-full h-full object-cover" />
                  </View>
                }                
              </View>
            </LinearGradient>
        
            <View className="w-full relative space-y-3 px-6 py-5 mb-16">    
              {
                route?.params?.description && 
                <RenderHtml
                  contentWidth={width}
                  source={{ html: route?.params?.description }}
                  baseStyle={{
                    fontFamily: "Inter-Regular",
                    fontSize: 16,
                    lineHeight: 20
                  }}
                  enableExperimentalMarginCollapsing={true}
                  enableExperimentalBRCollapsing={true}
                  enableExperimentalGhostLinesPrevention={true}
                />
              }  
            </View>
          </ScrollView>
          <Footer data={route.params.footerData} navigation={navigation} route={route} />
        </SafeAreaView>
    }
    </>
  );
};

export default PostDetailsScreen;