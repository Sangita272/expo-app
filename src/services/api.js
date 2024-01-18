import axios from "axios";
import BASE_URL from "../config/host";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiService = async (url, data, method) => {
  try {
    const value = await AsyncStorage.getItem('accessToken')
    const res = await axios({
      url: BASE_URL+url,
      method,
      data,
      headers: {
        Authorization: `Bearer ${value}`,
      },
    });
    return  res.data;
  } catch (error) {
    if(error.name==="AxiosError"){
      return { status: 400, message: error.response?.data.message };
    }
    return { status: 400, message: error.message };
  }
}