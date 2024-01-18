import React,{useState,useEffect} from 'react';
import { StatusBar, Text, View, SafeAreaView, ScrollView, Pressable, Image,useWindowDimensions,WebView,RefreshControl} from "react-native";
import { SheetManager } from 'react-native-actions-sheet';
import Audioplayer from '../components/elements/Audioplayer';
import RenderHtml from 'react-native-render-html';
import Footer from '../components/shared/Footer';
import { LinearGradient } from 'expo-linear-gradient';
import Styles from "../styles/Styles";
import { apiService } from '../services/api';
import Loader from '../components/shared/Loader';
import { classNames } from '../hooks/classNames';
import { Swipeable } from "react-native-gesture-handler";


const BookDetailsScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const { width } = useWindowDimensions();
  const [contentData, setContentData] = useState('');
  const [bookData, setbookData] = useState({});
  const [chapterName,setChapterName] = useState('');
  const [chapterId, setChapterId] = useState('650bdf5d021da88107e62404');
  const [loading, setLoading] = useState(false);
  const [ordering, setOrdering] = useState([]); 
  const [newData, setData] = useState([]);

  const [bookId,setBookId] = useState('');
  const [bookName,setBookName] = useState('');
  const [bookImage,setBookImage] = useState('');
  const [bookAuthor,setBookAuthor] = useState('');
  const [bookPublishDate,setBookPunlishDate] = useState('');

  useEffect(()=>{
    const getData = async() =>{
      setLoading(true)
      if(chapterId){
        const getBooks =  await apiService('chapter/details/'+chapterId,undefined,'GET')
        if(getBooks.status === 200){
          //console.log('fff',chapterId)
          setChapterName(getBooks?.data?.title)
          setContentData(getBooks?.data?.content);
          setbookData(getBooks?.data?.bookData);
          setOrdering(getBooks?.data?.ordering);
          setData(getBooks?.data);
          setBookId(getBooks?.data?.bookData?._id);
          setBookName(getBooks?.data?.bookData?.title);
          setBookImage((getBooks?.data?.bookData?.image)?getBooks?.data?.bookData?.image:null);
          setBookAuthor((getBooks?.data?.bookData?.authorData)?getBooks?.data?.bookData?.authorData?.fullname?.firstName+' '+getBooks?.data?.bookData?.authorData?.fullname?.lastName:'')        
        }
      }else{
     
        const getBooks =  await apiService('chapter/list?status=1',undefined,'GET');
        if(getBooks.status === 200){
          setChapterName((getBooks?.data?.docs.length>0)?getBooks?.data?.docs[0]?.title:'')
          setContentData((getBooks?.data?.docs.length>0)?getBooks?.data?.docs[0]?.content:'');
          setbookData((getBooks?.data?.docs.length>0)?getBooks?.data?.docs[0]?.bookData:'');
          setOrdering((getBooks?.data?.docs.length>0)?getBooks?.data?.docs[0]?.ordering:'');
          setData(getBooks?.data);
          setBookId(getBooks?.data?.docs[0]?.bookData?._id);
          setBookName(getBooks?.data?.docs[0]?.bookData?.title);
          setBookImage((getBooks?.data?.docs[0]?.bookData?.image)?getBooks?.data?.docs[0]?.bookData?.image:null);
          setBookAuthor((getBooks?.data?.docs[0]?.bookData?.authorData)?getBooks?.data?.docs[0]?.bookData?.authorData?.fullname?.firstName+' '+getBooks?.data?.docs[0]?.bookData?.authorData?.fullname?.lastName:'')        
        }
      }      
      setLoading(false)
    }
    getData();
  },[chapterId,route])

  //console.log('newData',newData)
  
  useEffect(()=>{
   // setChapterId(null);
 
    async function booksData() {
      try {
        if(route?.params?._id){
          const result = await apiService("book/details/"+route?.params?._id,undefined,'GET');
          if (result.data) {
          
            if(result.data.chapterData && result.data.chapterData.length>0){
              setChapterId(result.data.chapterData[0]._id);
              setBookId(result.data?._id);
              setData(result.data);
            }else{
              //setChapterId(null) 
              setBookId('');
              setContentData('');
            }                  
          } else {
            //setChapterId(null) 
            setContentData('');
            setBookId('');
            console.log("book list message", result.message);
          }
        }else{
          setChapterId('650bdf5d021da88107e62404')
        }       
      } catch (error) {
       // setChapterId(null) 
        setContentData('');
        console.log("Error book list catch", error.message);
      }
    }
    booksData();
    setBookName(route?.params?.name);
    setBookImage(route?.params?.image); 
  },[route])


  const WebDisplay = React.memo(function WebDisplay({html}) {
    const {width: contentWidth} = useWindowDimensions();
    const tagsStyles = {
      fontSize: '15px',
      lineHeight :'22px',
      fontFamily: 'NotoSerif-Regular',
    };
    return (
      <RenderHtml
        contentWidth={contentWidth}
        source={{html}}
        baseStyle={tagsStyles}
      />
    );
  });

  const LeftSwipeActions = () => {
    // console.log('newData',newData?.prevOrdering)
       return (
         <View>
           <Text>{newData?.previousPage?newData.ordering===0?1:(newData.ordering+1)-1:''}</Text>
         </View>
       );
     };


     const rightSwipeActions = () => {
      // console.log('newData',newData?.nextOrdering)
       return (
         <View>
           <Text>{newData?.nextPage?newData.ordering===0?2:newData.ordering+2:''}</Text>
         </View>
       );
     };

     const onSwipeableOpen = (direction) => {
      if (direction === "right") {
         if (newData?.nextPage) {
           setChapterId(newData?.nextPage);
         
          
         //  console.log(newData?.nextPage,'newData?.nextPage')
         }
       } else {
         if (newData?.previousPage) {
           setChapterId(newData?.previousPage);
          
          //console.log(newData?.previousPage,'newData?.previousPage')
         }
       }
     };

    

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {
        loading ? <Loader/> :
        <SafeAreaView className="w-full h-full">
          <ScrollView 
          className="w-full h-full" 
          stickyHeaderIndices={[0]} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <View>
          <Text>Books</Text>
         </View>
        
          </ScrollView>
         
          <Footer data={route.params.footerData} navigation={navigation} route={route} />
        </SafeAreaView>
      }
      
    </>

  );
};

export default BookDetailsScreen;