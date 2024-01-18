import React,{useEffect,useState,useRef} from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, Animated } from "react-native";
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { Audio } from "expo-av";

const Audioplayer = ({ navigation, route,newData,setChapterId }) => {
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const sound = useRef(new Audio.Sound());
  const scrollViewRef = useRef(null);
  const [duration, setDuration] = useState(false);
  const [isPlay, setPlay] = useState(false);
  const  [SampleTrack, setTrack] = useState();  

  useEffect(() => {  
    if(newData?.audioFile !== undefined && newData?.audioFile !== null){
      Array.isArray(newData?.audioFile) && newData?.audioFile.length > 0 && LoadAudio(newData?.audioFile[0].audio);
    } 
    return ()=>{
      sound && newData?.audioFile && sound.current.stopAsync();
    }
  }, [!newData?.audioFile]);

  useEffect(() => {
    const timer = window.setInterval(async() => {
      const  call =  await sound.current.getStatusAsync();
      if(call.shouldPlay){
        setDuration(call.positionMillis)
        scrollViewRef?.current?.measure((x, y, width, height) => {
        const totalHeight = height;
        var ms = Math.round(call.positionMillis),
        totalsec = Math.floor((call.durationMillis/1000) % 60);       
        });
      } 
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          setPlay(true);
        }
      }
    } catch (error) {}
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          setPlay(false);
        }
      }
    } catch (error) {}
  };

  const LoadAudio = async (audioFile) => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync({ rate: 0.1 });
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync({uri :audioFile}, {}, true);
        if (result.isLoaded === false) {
          SetLoading(false);
          console.log("Error in Loading Audio");
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  return (
    <View className="w-full">
      <View className="w-full absolute px-6 -mt-14">
        <View className="w-full flex-row items-center justify-between ">
          { newData?.previousPage ? 
          <TouchableOpacity onPress={() => setChapterId(newData?.previousPage)}>
            <View className="w-9 h-9 bg-east-bay items-center justify-center rounded-full">
              <AntDesign name="caretleft" size={16} color="#fff" />
            </View>
          </TouchableOpacity>:
          <View className="w-9 h-9"></View>
          }
          { Array.isArray(newData?.audioFile) && newData?.audioFile.length > 0  &&
          <TouchableOpacity onPress={() => {isPlay?PauseAudio():PlayAudio()}}>
            <View className="w-12 h-12 bg-black items-center justify-center rounded-full">
              <Ionicons name={isPlay?"pause":"play"} size={24} color="#fff" />
              {/* <AntDesign name="caretright" size={24} color="#fff" /> */}
            </View>
          </TouchableOpacity>
          }
          { newData?.nextPage ?
          <TouchableOpacity onPress={() => setChapterId(newData?.nextPage)}>
            <View className="w-9 h-9 bg-east-bay items-center justify-center rounded-full">
              <AntDesign name="caretright" size={16} color="#fff" />
            </View>
          </TouchableOpacity>:
          <View className="w-9 h-9"></View>
          }
        </View>
      </View>
    </View>
  );
};

export default Audioplayer;