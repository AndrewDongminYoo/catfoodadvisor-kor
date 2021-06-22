import React,{useState,useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import data from '../../data.json';
import Card from '../components/Card';
import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";
import axios from "axios"
import { firebase_db } from '../utils/firebase';
import AppLoading from 'expo-app-loading';
import Weather from '../components/Weather';

export default function MainPage({navigation,route}) {

  const main = {uri: "https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Fmain.png?alt=media&token=8e5eb78d-19ee-4359-9209-347d125b322c"}
  const [state, setState] = useState([...data.tip])
  const [cateState, setCateState] = useState([...data.tip])
  const [location, setLocation] = useState({
    coords: {
      longitude: 127,
      latitude: 37.58,
    }
  })
  const [weather, setWeather] = useState({
    temp : 0,
    condition : '',
    icon: '01n'
  })

  const [isReady,setIsReady] = useState(false)

  useEffect(()=>{
    setTimeout(() => {
      navigation.setOptions({
        title:'나만의 꿀팁'
      })
      firebase_db.ref('/tip').once('value').then((snapshot) => {
        console.log("tips loaded")
        let tip = snapshot.val();
        setState(tip)
        setCateState(tip)
      });
      getLocation()
    }, 500);
  },[])

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const locationData= await Location.getCurrentPositionAsync();
      const latitude = location.coords.latitude ?? 37.58
      const longitude = location.coords.longitude ?? 127
      console.log(latitude, longitude)
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const temp = result.data.main.temp;
      const condition = result.data.weather[0].description
      const icon = result.data.weather[0].icon

      console.log(temp)
      console.log(condition)
      console.log(icon)

      setWeather({
        temp,
        condition,
        icon
      })
    } catch (error) {
      console.log("날씨 불러오기 실패:C");
    }
  }

    const category = (cate) => {
        if(cate == "전체보기"){
            setCateState(state)
        }else{
            setCateState(state.filter((d)=>{
                return d.category == cate
            }))
        }
    }


  return isReady ? (
    <ScrollView style={styles.container}>
        <StatusBar style="black" />
        <Text numberOfLines={2} style={styles.weather}>Today: {weather.temp}°C <Weather icon={weather.icon} /></Text>
        <Text numberOfLines={2} style={styles.weather}>{weather.condition}</Text>
        <Image style={styles.mainImage} source={main}/>
        <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
            <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton04} onPress={()=>{navigation.navigate('LikePage')}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
        </ScrollView>
        <View style={styles.cardContainer}>
          <FlatList
            keyExtractor={(state) => state.id}
            data={cateState}
            windowSize={3}
            renderItem={({ state, i }) => (
              <Card content={state} key={i} navigation={navigation}/>
            )}
          />

        </View>
    </ScrollView>
  ) : (
    <AppLoading
      startAsync={getLocation}
      onFinish={setIsReady(true)}
      onError={console.warn}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  weather:{
    alignSelf:"flex-end",
    paddingRight:20,
    textTransform: "capitalize",
    alignItems: "flex-end",
  },
  mainImage: {
    width:'90%',
    height:200,
    borderRadius:10,
    marginTop:20,
    alignSelf:"center"
  },
  middleContainer:{
    marginTop:20,
    marginLeft:10,
    height:60
  },
  middleButtonAll: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#20b2aa",
    borderRadius:15,
    margin:7
  },
  middleButton01: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fdc453",
    borderRadius:15,
    margin:7
  },
  middleButton02: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fe8d6f",
    borderRadius:15,
    margin:7
  },
  middleButton03: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#9adbc5",
    borderRadius:15,
    margin:7
  },
  middleButton04: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#f886a8",
    borderRadius:15,
    margin:7
  },
  middleButtonText: {
    color:"#fff",
    fontWeight:"700",
    textAlign:"center"
  },
  middleButtonTextAll: {
    color:"#fff",
    fontWeight:"700",
    textAlign:"center"
  },
  cardContainer: {
    marginTop:10,
    marginLeft:10
  },
  aboutButton: {
    backgroundColor:"pink",
    width:100,
    height:40,
    borderRadius:10,
    alignSelf:"flex-end",
    marginRight:20,
    marginTop:10
  },
  aboutButtonText: {
    color:"#fff",
    textAlign:"center",
    marginTop:10
  }
});