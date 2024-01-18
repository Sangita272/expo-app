import React from 'react';
import { Text, View, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {classNames} from '../../hooks/classNames';

import Styles from "../../styles/Styles";
const Footer = ({ data = [], navigation, route }) => {
  return (
    <View className="relative w-full flex-row justify-between py-2 px-4 bg-white rounded-t-3xl" style={Styles.shadow}>
      {data.map((item) => (
      <View className="justify-center" key={item._id}>
        <Pressable 
          className={classNames(
            "h-16 w-16 rounded-full items-center justify-center",
            route.name === item.route ?"bg-[#2E1F47]":"bg-white"
          )}
          onPress={() => navigation.navigate(item.route)}
        >
          <Ionicons name={item.icon} size={24} color={route.name === item.route ?"#ffff":"#94a3b8"} />
          <Text 
          className={classNames(
            "text-[10px] capitalize tracking-wider",
            route.name === item.route ?"text-white":"text-[#94a3b8]"
          )} 
          style={{ fontFamily: 'EncodeSans-SemiBold' }}
          >{item.name}</Text>
        </Pressable>
      </View>
      ))}
    </View>
  );
}

export default Footer;