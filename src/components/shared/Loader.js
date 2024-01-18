import React from 'react';
import { ActivityIndicator,StyleSheet, View } from 'react-native'

const Loader = () => {
  return (
    <View className="justify-items-center flex-1 mt-52">
      <ActivityIndicator size="large" color="#5D3E8E" />   
    </View>  
  );
};

export default Loader;