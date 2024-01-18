import React from 'react';
import FeaturedItem from "../items/FeaturedItem";
import { ScrollView, Text, View } from "react-native";

const Featured = ({ data, viewType,navigation }) => {  
  return (
    <> 
      <View className="relative" style={{flex:1}}>
        {data.title &&
        <View className="px-6 mb-2">
          <Text className="text-base" style={{ fontFamily: 'Inter-SemiBold' }}>{data.title}</Text>
        </View>
        }
        <View className="relative">
          {(viewType === 'grid') ? (
            <View className="flex-row flex-wrap px-4">
              {data?.subdata?.map((item, index) => (
                <FeaturedItem key={item._id} data={item} index={index} length={data?.subdata?.length} viewType={viewType} navigation={navigation} />
              ))}
            </View>
          ) : (
            <ScrollView horizontal={true} nestedScrollEnabled={true} showsHorizontalScrollIndicator={false} className="h-auto flex flex-row flex-nowrap overflow-scroll">
            {data?.subdata?.map((item, index) => (
              <FeaturedItem key={item._id} data={item} index={index} length={data?.subdata?.length} navigation={navigation} />
            ))}
          </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default Featured;