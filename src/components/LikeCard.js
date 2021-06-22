import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { firebase_db } from '../utils/firebase';
import Constants from 'expo-constants';
export default function LikeCard({content,navigation,reload}){

  const remove = () =>{

    const user_id = Constants.installationId;
    firebase_db
      .ref('/like/'+user_id+'/'+ content.idx)
      .remove()
      .then(function(){
        console.log(content.idx)
        Alert.alert('찜해제되었습니다.')
        reload()
      })
  }

  return(
        <View style={styles.card}>
          <Image style={styles.cardImage} source={{uri:content.image}}/>
          <View style={styles.cardText}>
              <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
              <Text style={styles.cardDate}>{content.date}</Text>
              <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.sideButton} onPress={()=>{navigation.navigate('DetailPage',{idx:content.idx})}}><Text style={styles.buttonText}>자세히보기</Text></TouchableOpacity>
                <TouchableOpacity style={styles.sideButton} onPress={()=>remove()}><Text style={styles.buttonText}>찜해제하기</Text></TouchableOpacity>
              </View>
          </View>
        </View>
    )
}


const styles = StyleSheet.create({

    card:{
      flex:1,
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10
    },
    cardImage: {
      flex:1,
      width:100,
      height:100,
      borderRadius:10,
    },
    cardText: {
      flex:2,
      flexDirection:"column",
      marginLeft:10,
    },
    cardTitle: {
      fontSize:20,
      fontWeight:"700"
    },
    cardDesc: {
      fontSize:15
    },
    cardDate: {
      fontSize:10,
      color:"#A6A6A6",
    },
    sideButton:{
      backgroundColor:"#fff",
      borderColor:"#C71585",
      borderRadius:10,
      borderWidth:1,
      width:100,
      height:40,
      padding:10,
      margin:12
    },
    buttonText:{
      color:"#C71585",
      textAlign:"center",
      fontSize:12
    }
});