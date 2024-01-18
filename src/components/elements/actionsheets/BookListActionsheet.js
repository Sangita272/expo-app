import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Entypo, Octicons } from "@expo/vector-icons";
import { classNames } from "../../../hooks/classNames";
import { apiService } from "../../../services/api";
import { LinearGradient } from "expo-linear-gradient";
import Loader from "../../shared/Loader";
//import { useDispatch, useSelector } from "react-redux";
//import { fetchBooks } from "../../../store/book";

const SubItem = ({ data }) => (
  <>
    <Pressable
      className={classNames(
        "h-8 w-8 items-center justify-center border  rounded-full m-1",
        data.isActive ? "bg-[#5D3E8E] border-[#5D3E8E]" : "bg-white border-[#5D3E8E]"
      )}
      onPress={data.click}
    >
      <Text
        className={classNames(
          "text-sm",
          data.isActive ? "text-white" : "text-bg-[#5D3E8E]"
        )}
        style={{ fontFamily: "Inter-Medium" }}
      >
        {data._id}
      </Text>
    </Pressable>
  </>
);

const Item = ({ data, index, maxLength }) => {
  return (
    <>
      <View
        className={classNames(
          "border-y border-slate-100 -mb-[1px]",
          index === 0 ? "!border-t-0" : "",
          index === maxLength - 1 ? "!border-b-0" : ""
        )}
      >
        <Pressable
          className="w-full flex-row items-center space-x-4 px-5 py-3 justify-between"
          onPress={data.click}
        >
          <View className="w-full flex-grow flex-shrink">
            <Text
              className="text-sm text-[#5D3E8E]"
              style={{ fontFamily: "Laila-SemiBold" }}
            >
              {data.name}
            </Text>
          </View>
          <View
            className={classNames(
              "flex-grow-0 flex-shrink-0 items-center justify-center opacity-50",
              data.isOpened ? "rotate-90" : ""
            )}
          >
            <Entypo name={"chevron-thin-right"} size={20} color={"#94a3b8"} />
          </View>
        </Pressable>
        <View
          className={classNames(
            "overflow-hidden px-6 bg-[#d2c6e6]",
            data.isOpened ? "max-h-[2000px] py-4" : "max-h-0 py-0"
          )}
        >
          {data.chapter?.length > 0 && (
            <View className="mb-1">
              <Text
                className="text-xs uppercase text-slate-900"
                style={{ fontFamily: "Inter-SemiBold" }}
              >
                Chapters:
              </Text>
            </View>
          )}
          <View className="flex-row flex-wrap -mx-1">
            {data.chapter?.map((subitem) => (
              <SubItem data={subitem} key={data._id + "-" + subitem._id} />
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

const BookListActionsheet = ({ sheetId, payload }) => {
  const actionSheetRef = useRef(null);
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookList,setBookList] = useState([]);
  //const dispatch = useDispatch();
  //const { bookList } = useSelector((state) => state.books);

  useEffect(() => {
    async function booksData() {
      try {
        const result = await apiService("book/list?status=1",undefined,'get');
        if (result.data) {
          setBookList(result.data.docs)
        } else {
          console.log("book list message", result.message);
        }
      } catch (error) {
        console.log("Error book list catch", error.message);
      }
    }
    booksData();
  },[])

  // useEffect(() => {
  //   dispatch(fetchBooks())
  // }, []);
 //console.log('bookList',bookList)

  useEffect(()=>{
    let newData = [];
    Array.isArray(bookList) &&
    bookList.map((item) => {
      newData.push({
        _id: item._id,
        name: item.title,
        isOpened: (payload.bookId === item._id)?true:false,
        click: () =>
          setBooksData((booksData) =>
            booksData.map((itm) => {
              if (itm._id === item._id) {
                return { ...itm, isOpened: !itm.isOpened };
              } else {
                return { ...itm };
              }
            })
          ),
        chapter: item.chapterData.map((it, index) => {
          return {
            _id: index + 1,
            name: it.title,
            isActive: (payload.chapterId === it._id)?true:false,
            click: () => {
              //callChapter(it._id);
              payload.setChapterId(it._id);
              SheetManager.hide('BookListActionsheet');
              setBooksData(
                booksData => booksData.map(iti => iti._id !== payload.chapterId ? iti : {
                  ...iti,
                  chapter: iti.chapter.map(subitem => subitem._id !== index+1 ? {
                    ...subitem,isActive: false
                  } : { ...subitem, isActive: true })
                })
              )
            },
          };
        }),
      });
      //newData.chapter.push({});
    });   
    setBooksData(newData);
    setLoading(false)
  },[bookList.length > 0,payload.chapterId])
  return (
    <>    
      <ActionSheet
        id={sheetId}
        ref={actionSheetRef}
        useBottomSafeAreaPadding={true}
        containerStyle={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          padding: 0,
          margin: 0,
        }}
        indicatorStyle={{
          width: 100,
          backgroundColor: "#d6b36a",
        }}
        gestureEnabled={false}
      >
        <View className="w-full">
          <LinearGradient colors={['#5D3E8E', '#5D3E8E', '#5D3E8E']}  className="px-5 py-4 pt-6  -mt-2 mb-4 -z-10 relative">
            <Text
              className="text-xl text-white text-center"
              style={{ fontFamily: "Laila-Bold" }}
            >
              Books 
            </Text>
            {/* <Pressable className="absolute top-7 right-4">
              <Octicons name="history" size={16} color="black" />
            </Pressable> */}
          </LinearGradient>
         {loading && <Loader/>}
         {!loading && <FlatList
            data={booksData}            
            renderItem={({ item, index }) => (
              <Item data={item} index={index} maxLength={booksData.length} />
            )}
            keyExtractor={(item) => item._id}
            className="w-full max-h-96"
          />}
        </View>

        
      </ActionSheet>

      
    </>
  );
};

export default BookListActionsheet;