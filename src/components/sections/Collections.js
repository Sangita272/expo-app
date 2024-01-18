import React from 'react';
import { Image, Pressable, Text, View } from "react-native";
import Styles from "../../styles/Styles";
import BookDetailsScreen from '../../pages/BookDetailsScreen';

const Collections = ({data,navigation}) => {
  return (
    <>
      <View className="relative px-6" style={{flex:1}}>
        <View className="mb-2">
          <Text className="text-base" style={{ fontFamily: 'Inter-SemiBold' }}>{data.title}</Text>
        </View>        
        <View className="flex-row space-x-4">
          {
            (data?.subdata && data?.subdata.length>0 && data?.subdata[0]) &&
            <View className="w-1/2 flex-grow flex-shrink">
              <Pressable className="relative rounded-lg overflow-hidden" style={[Styles.shadow]} onPress={()=> navigation.navigate('BookDetailsScreen', {_id:data?.subdata[0]._id, name: data?.subdata[0].name,image:data?.subdata[0].image,description:data?.subdata[0].description})}>
                <View className="w-full h-60">
                  <Image source={{uri:data?.subdata[0].image}} resizeMode="cover" className="w-full h-full object-cover" />
                </View>
                <View className="bg bg-[#5D3E8E] absolute left-0 bottom-0 right-0 h-10 justify-center px-4">
                  <Text className="text-xs text-center text-white" numberOfLines={2} style={{ fontFamily: 'Inter-SemiBold' }}>{data?.subdata[0].name}</Text>
                </View>
              </Pressable>
            </View>
          }          
          <View className="w-1/2 flex-grow flex-shrink space-y-4">
          {
            (data?.subdata && data?.subdata.length>0 && data?.subdata[1]) &&
            <View className="">
              <Pressable className="relative rounded-lg overflow-hidden" style={[Styles.shadow]} onPress={()=> navigation.navigate('BookDetailsScreen', {_id:data?.subdata[1]._id,name: data?.subdata[1].name,image:data?.subdata[1].image,description:data?.subdata[1].description}) }>
                <View className="w-full h-28">
                  <Image source={{uri:data?.subdata[1].image}} resizeMode="cover" className="w-full h-full object-cover" />
                </View>
                <View className="bg bg-[#5D3E8E] absolute left-0 bottom-0 right-0 h-10 justify-center px-4">
                  <Text className="text-xs text-center text-white" numberOfLines={2} style={{ fontFamily: 'Inter-SemiBold' }}>{data?.subdata[1].name}</Text>
                </View>
              </Pressable>
            </View>
          }
          {
            (data?.subdata && data?.subdata.length>0 && data?.subdata[2]) &&
            <View className="">
              <Pressable className="relative rounded-lg overflow-hidden" style={[Styles.shadow]} onPress={()=> {navigation.navigate('BookDetailsScreen',{_id:data?.subdata[2]._id,name: data?.subdata[2].name,image:data?.subdata[2].image,description:data?.subdata[2].description})} }>
                <View className="w-full h-28">
                  <Image source={{uri:data?.subdata[2].image}} resizeMode="cover" className="w-full h-full object-cover" />
                </View>
                <View className="bg bg-[#5D3E8E] absolute left-0 bottom-0 right-0 h-10 justify-center px-4">
                  <Text className="text-xs text-center text-white" numberOfLines={2} style={{ fontFamily: 'Inter-SemiBold' }}>{data?.subdata[2].name}</Text>
                </View>
              </Pressable>
            </View>
          }           
          </View>
        </View>
      </View>
    </>
  );
};

export default Collections;