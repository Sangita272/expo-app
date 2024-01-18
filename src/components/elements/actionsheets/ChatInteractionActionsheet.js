import React, {useRef} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { Feather } from '@expo/vector-icons';

const ChatInteractionActionsheet = ({sheetId, payload}) => {
  const actionSheetRef = useRef(null);

  return (
    <>
      <ActionSheet
        id={sheetId}
        ref={actionSheetRef}
        useBottomSafeAreaPadding={true}
        containerStyle={{
          backgroundColor:"#fff",
          borderTopLeftRadius:25,
          borderTopRightRadius:25,
          padding:0,
          margin:0
        }}
        indicatorStyle={{
          width:100,
          backgroundColor:"#ededed",
        }}
        gestureEnabled={true}>
        <View className="w-full">
          <View className="py-3 divide-y divide-slate-100">
            <View className="relative">
              <TouchableOpacity className="w-full flex-row items-center space-x-4 px-5 py-3" onPress={() => {payload.setIsSearch(); SheetManager.hide("ChatInteractionActionsheet")}}>
                <Feather name="search" size={20} color="#4B535B" />
                <Text className="text-base text-slate-600" style={{fontFamily: 'Inter-Medium'}}>Search</Text>
              </TouchableOpacity>
            </View>
            <View className="relative">
              <TouchableOpacity className="w-full flex-row items-center space-x-4 px-5 py-3">
                <Feather name="download" size={20} color="#4B535B" />
                <View className="flex-row items-center space-x-2">
                  <Text className="text-base text-slate-600" style={{fontFamily: 'Inter-Medium'}}>Download in PDF</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="relative">
              <TouchableOpacity className="w-full flex-row items-center space-x-4 px-5 py-3">
                <Feather name="folder" size={20} color="#4B535B" />
                <Text className="text-base text-slate-600" style={{fontFamily: 'Inter-Medium'}}>Move to folder</Text>
              </TouchableOpacity>
            </View>
            <View className="relative">
              <TouchableOpacity className="w-full flex-row items-center space-x-4 px-5 py-3">
                <Feather name="trash-2" size={22} color="#e11d48" />
                <Text className="text-base text-rose-600" style={{fontFamily: 'Inter-Medium'}}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ActionSheet>
    </>
  );
};

export default ChatInteractionActionsheet;