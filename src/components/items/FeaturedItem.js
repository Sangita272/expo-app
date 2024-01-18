import React from 'react';
import { Image, Pressable, View, Text } from "react-native";
import { classNames } from "../../hooks/classNames";
import Styles from "../../styles/Styles";
import { Ionicons } from "@expo/vector-icons";

const FeaturedItem = ({data, index, length, viewType,navigation}) => {
  return (
    <>
      <View 
        className={classNames(
          "relative px-2",
          (index === 0) ? "pl-6" : (index === (length - 1)) ? "pr-6" : "",
          (viewType === 'grid') ? "!px-2 w-1/2 max-w-[50%] flex-grow flex-shrink" : ""
        )}
      >
        <Pressable 
          className={classNames(
            "relative overflow-hidden rounded-xl z-0 justify-end flex-1 mb-4",
            (viewType === 'grid') ? "w-full" : "w-40 min-w-[160px]"
          )}
          style={[Styles.shadowMd]}
          onPress={()=> navigation.navigate('PostDetailsScreen', {name: data?.name,image:data?.image,description:data?.description,media:data?.media})}
        >
          <View className="relative w-full h-56">
            <Image source={{uri:data.image}} resizeMode="cover" className="w-full h-full object-cover"/>
          </View>
          <View className="relative px-4 h-12 bg-[#5D3E8E] flex-row items-center justify-between space-x-2">
            <View className="w-full flex-grow flex-shrink">
              <Text className="text-xs text-white" numberOfLines={2} style={{ fontFamily: 'Inter-Bold', lineHeight:14 }}>{data.name}</Text>
            </View>
            <View className="w-6 h-6 bg-[#5D3E8E] items-center justify-center rounded-full">
              <Ionicons name="arrow-forward" size={14} color="#fff" />
            </View>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default FeaturedItem;