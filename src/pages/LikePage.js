import React from 'react'
import { useState,useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import LikeCard from '../components/LikeCard';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import { firebase_db } from '../../firebaseConfig';


export default function LikePage({navigation,route}) {
  const [ready,setReady] = useState(true)
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
          setReady(false)
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
            setReady(true)
            setTip([])
        }

    })
  }

	return ready ? <Loading/> : (
  <ScrollView style={styles.container}>
    {
      tip.map((content,i)=>{
        return (<LikeCard content={content} key={i} navigation={navigation} reload={reload}/>)
        }
      )
    }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});