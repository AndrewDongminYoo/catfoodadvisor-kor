import React from 'react';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function AboutPage() {

    const link = () => {
        Linking.openURL("https://www.instagram.com/minzzi._.andrew/")
    }
    return (
        <View style={styles.contatiner}>
            <View style={styles.outerContainer}>
                <Text
                    style={styles.mainTitle}
                    >
                    HI! 스파르타코딩 앱개발{'\n'}
                    반에 오신 것을 환영합니다.
                </Text>
            </View>
            <View style={styles.innerContainer}>
                <Image
                    style={styles.aboutImage}
                    source={{uri:"https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2FaboutImage.png?alt=media&token=13e1c4f6-b802-4975-9773-e305fc7475c4"}}
                    resizeMode={"cover"}
                    />
                <Text
                    style={styles.heading1}
                    numberOfLines={2}>
                    많은 내용을 간결하게 담아내려 노력했습니다!</Text>
                <Text
                    style={styles.heading2}
                    numberOfLines={2}>
                    꼭 완주하셔서 꼭 여러분의 것으로 만들어가시길 바랍니다.</Text>
                <TouchableOpacity
                    style={styles.instagramButton}
                    onPress={()=>link()}>
                    <Text style={styles.instagramText}>
                        @minzzi._.andrew
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    contatiner: {
        flex:1,
        backgroundColor:"#252c74"
    },
    mainTitle:{
        fontSize:29,
        fontWeight:"900",
        textAlign:"center",
        color:"#fff",
        fontFamily:"sans-serif"
    },
    outerContainer:{
        borderRadius:12,
        paddingVertical:60,
        width:360,
        alignSelf:"center"
    },
    innerContainer:{
        backgroundColor:"#fff",
        borderRadius:30,
        width:360,
        height:540,
        alignSelf:"center",
        paddingHorizontal:20,
        marginHorizontal:20,
        marginBottom:50
    },
    aboutImage:{
        alignSelf:"center",
        marginTop:90,
        width:120,
        height:120,
        borderRadius:30
    },
    heading1:{
        fontSize:22,
        fontWeight:"900",
        textAlign:"center",
        marginTop:15,
        marginHorizontal:20,
        fontFamily:"sans-serif"
    },
    heading2:{
        fontSize:16,
        fontWeight:"900",
        textAlign:"center",
        marginTop:20,
        marginHorizontal:20,
        fontFamily:"sans-serif"
    },
    instagramButton:{
        backgroundColor:"#efb342",
        padding:20,
        width:180,
        borderRadius:15,
        alignSelf:"center",
        marginTop:20,
        marginBottom:90
    },
    instagramText:{
        color:"#fff",
        textAlign:"center",
        fontSize:16,
        fontFamily:"sans-serif"
    }
  });