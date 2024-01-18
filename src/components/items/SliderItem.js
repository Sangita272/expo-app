import React from 'react';
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { classNames } from "../../hooks/classNames";
import Styles from "../../styles/Styles";

const SliderItem = ({data, index, length,navigation}) => { 

  return (
    <>
      <View className={classNames("relative flex-1 px-2", (index === 0) ? "pl-6" : (index === (length - 1)) ? "pr-6" : "")} style={{flex:1}}>
        <Pressable 
          className="relative w-80 min-w-[320px] overflow-hidden rounded-xl flex-1 flex-row mb-4 bg-white py-3 px-4" 
          style={[Styles.shadow]}
          onPress={()=> navigation.navigate('PostDetailsScreen', {name: data?.name,image:data?.image,description:data?.description,media:data?.media})}
        >

          <View className="relative flex-grow flex-shrink justify-end">
            <View className="space-y-2 mb-auto">
              <Text className="text-lg text-slate-900" numberOfLines={2} style={{ fontFamily: 'Inter-Bold', lineHeight:20 }}>{data.name}</Text>
              <Text className="text-xs text-slate-500" numberOfLines={3} style={{ fontFamily: 'Inter-Light' }}>{(data.description)?data.description.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/g, ' '):''}</Text>
            </View>
            <View className="relative flex flex-row items-center space-x-2 mt-2">
              <Text className="text-xs text-slate-900" numberOfLines={2} style={{ fontFamily: 'Inter-Bold', lineHeight:14 }}>Read more</Text>
              <View className="w-6 h-6 bg-[#2E1F47] items-center justify-center rounded-full">
                <Ionicons name="arrow-forward" size={14} color="#fff" />
              </View>
            </View>
          </View>
          <View className="w-[90px] h-32 overflow-hidden rounded-md ml-4" style={Styles.shadow}>
            <Image source={{uri:data.image}} resizeMode="cover" className="w-full h-full object-cover"/>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default SliderItem;