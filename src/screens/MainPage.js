import React,{useState,useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import data from '../../data.json';
import Card from '../components/Card';
import { StatusBar } from 'expo-status-bar';

import { firebase_db } from '../utils/firebase';
import AppLoading from 'expo-app-loading';
import Weather from '../components/Weather';

export default function MainPage({navigation,route}) {

  const [isReady, setIsReady] = useState(false);

  return isReady ? (
    <View style={styles.container}>
      <StatusBar style="black" />
      <Weather />
        {/*
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
        </View> */}
    </View>
  ) : (
    <AppLoading
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