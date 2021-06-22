import React from 'react'
import { useState,useEffect } from 'react';
import LikeCard from '../components/LikeCard';
import Constants from 'expo-constants';
import { firebase_db } from '../utils/firebase';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function LikePage({navigation,route}) {
  const [isReady, setIsReady] = useState(false)
  const [tip, setTip] = useState([])

  useEffect(()=>{
    navigation.setOptions({
        title:'나만의 꿀팁'
    })
    const user_id = Constants.installationId
    firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
        let tip = Object.values(snapshot.val());
        console.log(tip)
        if (tip.length) {
          setTip(tip)
          setIsReady(true)
      }
    })
  },[])

  const reload = () =>{
    const user_id = Constants.installationId;
    firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
        if(snapshot.exists()){
            let tip = snapshot.val();
            let tip_list = Object.values(tip)
            setTip(tip_list)
        }else{
            setTip([])
        }

    })
  }

	return isReady ? (
    <ScrollView style={styles.container}>
    {
      tip.map((content,i)=>{
        return (<LikeCard content={content} key={i} navigation={navigation} reload={reload}/>)
        }
      )
    }
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});