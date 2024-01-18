import React from 'react';
import { ScrollView } from "react-native";
import SliderItem from "../items/SliderItem";

const MainSlider = ({data,navigation}) => {
  return (
    <>
      <ScrollView horizontal={true} nestedScrollEnabled={true} showsHorizontalScrollIndicator={false} className="h-auto flex flex-row flex-nowrap overflow-scroll" style={{flex:1}}>
        {data?.map((item, index) => (
          <SliderItem key={item._id} data={item} index={index} length={data?.length} navigation={navigation} />
        ))}
      </ScrollView>
    </>
  );
};

export default MainSlider;