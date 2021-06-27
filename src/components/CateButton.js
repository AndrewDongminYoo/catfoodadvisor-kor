import React from "react";
import { useState, useEffect } from "react";
import { ButtonGroup } from "react-native-elements";
import { DB } from '../utils/firebase'

export default function CateButton ({propsFunction}) {

  const [brandStarts, setBrandStarts] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState(13);

  useEffect(()=>{
    const unsubscribe = DB.collection('brands')
      .orderBy('brand', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setBrandStarts(list);
      });
    return unsubscribe();
  }, []);

  const _handleButtonPRess = selectedIndex => {
    const toAlphabet = {
      0: "ㄱ", 1: "ㄴ", 2: "ㄷ", 3: "ㄹ", 4: "ㅁ", 5: "ㅂ", 6: "ㅅ",
      7: "ㅇ", 8: "ㅈ", 9: "ㅊ", 10:"ㅋ", 11:"ㅌ", 12:"ㅍ", 13:"ㅎ",
     }
    setSelectedIndex(selectedIndex);
    return propsFunction(toAlphabet[selectedIndex])
  }

  return (
    <ButtonGroup
      buttonStyle={{ width: 20, alignSelf:"center" }}
      buttonContainerStyle={{}}
      buttons={[
        "ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ",
        "ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ",
      ]}
      containerStyle={{ alignSelf: "center", color: "#FFF5EE", width: "95%" }}
      innerBorderStyle={{ color: "#FFF5EE" }}
      onPress={selectedIndex => _handleButtonPRess(selectedIndex)}
      selectedButtonStyle={{ backgroundColor: "#BC8F8F" }}
    />
  );
}