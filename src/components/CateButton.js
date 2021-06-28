import React from "react";
import { useState, useEffect } from "react";
import { ButtonGroup } from "react-native-elements";
import { useFonts } from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";

export default function CateButton ({propsFunction}) {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fontsLoaded] = useFonts({
    'BlackHanSans': require('../../assets/fonts/BlackHanSans-Regular.ttf')
  })

  const _handleButtonPRess = selectedIndex => {
    const toAlphabet = {
      0: "ㄱ", 1: "ㄴ", 2: "ㄷ", 3: "ㄹ", 4: "ㅁ", 5: "ㅂ", 6: "ㅅ",
      7: "ㅇ", 8: "ㅈ", 9: "ㅊ", 10:"ㅋ", 11:"ㅌ", 12:"ㅍ", 13:"ㅎ",
     }
    setSelectedIndex(selectedIndex);
    return propsFunction(toAlphabet[selectedIndex])
  }

  useEffect(()=>{
    setSelectedIndex('ㄱ')
  }, [])

  return fontsLoaded ? (
    <ButtonGroup
      textStyle={{ fontFamily: 'BlackHanSans' }}
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
  ) : (
    <AppLoading/>
  )
}