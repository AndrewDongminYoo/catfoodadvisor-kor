import React from 'react';
import { useLayoutEffect, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { images } from '../utils/storage'
import { firebase_db } from '../utils/firebase';
import AppLoading from 'expo-app-loading';
import { Dimensions } from 'react-native';
import { Text } from 'react-native'


const Container = styled.ScrollView`
    background-color: #FFEBCD;
`;

const StyledImage = styled.Image`
    height: 250px;
    width: 250px;
    margin-horizontal: auto;
    margin-top: 40px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: #fff;
`;

const TextContainer = styled.View`
    background-color: #fff;
    margin-horizontal: 20px;
    margin-bottom: 10px;
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 24;
    font-weight: 900;
    color: #000;
    padding: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const SubTitle = styled.Text`
    font-size: 16;
    font-weight: 900;
    color: #000;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Description = styled.Text`
    margin-top: 10px;
    color: #000;
`;

const NutrientbarContainer = styled.View`
    height: 30px;
    width: ${({windowWidth}) => windowWidth-40}px;
    flex-direction: row;
    margin-bottom: 10px;
    align-self: center;
`;

const Nutrientbar = styled.View`
    height: 30px;
    width: ${({ windowWidth, percent }) =>
        (windowWidth - 60) *percent}px;
    item-align: center;
    border-width: 1.5px;
    border-color: #8B4513;
`;

export default function DetailPage({navigation, route: { params }}) {

    const windowWidth = Dimensions.get('window').width
    const [isReady, setIsReady] = useState(false)
    const [item, setItem] = useState({
        "이름": "9CARES KITTEN",
        "id": 2,
        "수입사": "마쯔리코리아",
        "브랜드": "나인케어",
        "Manufacturer": "Perfect Companion Group",
        "Brand": "9CARES",
        "Formula": "KITTEN",
        "Process": "Extrusion",
        "무게(kg)": 6.0,
        "가격": 50000,
        "100g당가격": 833.3333333333334,
        "Carbonate": 0.24999999999999997,
        "Protein": 0.36,
        "Fat": 0.16,
        "조섬유": 0.04,
        "조회분": 0.09,
        "수분": 0.1,
        "칼슘": 0.01,
        "인": 0.008,
        "열량": 3900.0,
        "P+F+C": 388.0,
        "P": 0.3711340206185567,
        "F": 0.3711340206185567,
        "C": 0.25773195876288657,
        "Ca:P": 0.8,
        "성분": "A",
        "Probiotics": false,
        "Cranberry": false,
        "Yucca": false,
        "meal-free": true,
        "Grain-free": false,
        "Oil/Fat": "Poultry fat",
        "원료": 2,
        "사용된원료": [
          "dehydrated Chicken",
          "Chicken",
          "whole grain wheat and barley",
          "corn protein",
          "Animal fat preserved with mixed-tocopherols (form of vitamin E)",
          "wheat protein",
          "calcium",
          "phosphorous",
          "sodium",
          "chloride",
          "potassium",
          "magnesium",
          "manganese",
          "copper",
          "zinc",
          "iron",
          "iodine",
          "selenium",
          "vitamin A",
          "vitamin B1",
          "vitamin B2",
          "vitamin B3",
          "folic acid",
          "vitamin B5",
          "vitamin B6",
          "vitamin B12",
          "vitamin C",
          "vitamin D",
          "vitamin E",
          "choline",
          "pyrophosphates",
          "beta-carotene",
          "chicory",
          "fish and/or vegetable oils",
          "dehydrated fish",
          "natural antioxidants"
        ]
      })

    useEffect(() => {
        console.log(params)
        const { id } = params;
        firebase_db
            .ref('/data/'+String(id))
            .once('value')
            .then(snapshot => {
                let item = snapshot.val();
                setItem(item)
                setIsReady(true)
            })
    }, [])

    navigation.setOptions({
        title: item['이름']
        })

    return isReady ? (
        <Container>
            <StyledImage source={{uri:images.sample}}/>
            <TextContainer>
                <Title>{item['이름']}</Title>
                <Description>{item['브랜드']} | {item['Manufacturer']}</Description>
                <Description>원료: {item['원료']}등급</Description>
                <Description>성분: {item['성분']}등급</Description>
                <Description>평균가격: {item['100g당가격'].toFixed(1)}원/100g</Description>
            </TextContainer>
            <TextContainer>
                <SubTitle>사용된 원료</SubTitle>
                <Description>{item['사용된원료'].join(', ')}</Description>
            </TextContainer>
            <NutrientbarContainer windowWidth={windowWidth}>
                <Nutrientbar windowWidth={windowWidth} style={{backgroundColor:"#FFA07A"}} percent={item['P']}><Text style={{textAlign:'center', fontWeight:"900", lineHeight: 30, color:"#fff"}}>P: 단백질이지!!</Text></Nutrientbar>
                <Nutrientbar windowWidth={windowWidth} style={{backgroundColor:"#B22222"}} percent={item['F']}><Text style={{textAlign:'center', fontWeight:"900", lineHeight: 30, color:"#fff"}}>F: 난 지방이다!</Text></Nutrientbar>
                <Nutrientbar windowWidth={windowWidth} style={{backgroundColor:"#6A5ACD"}} percent={item['C']}><Text style={{textAlign:'center', fontWeight:"900", lineHeight: 30, color:"#fff"}}>C: 탄수화물헤헤</Text></Nutrientbar>
            </NutrientbarContainer>
            <TextContainer>
                <Description>
                제조사 {item['Manufacturer']}의 {item['브랜드']} 브랜드 {item['이름']} 제품은 {item['Process']} 공법으로 생산되었으며, 영양소는 단백질: {item['Protein'].toFixed(1)}%, 지방: {item['Fat'].toFixed(1)}%, 탄수화물: {item['Carbonate'].toFixed(1)}%, 조섬유: {item['조섬유'].toFixed(1)}%, 조회분: {item['조회분'].toFixed(1)}%, 수분: {item['수분'].toFixed(1)}%, 칼슘: {item['칼슘'].toFixed(2)}%, 인: {item['인'].toFixed(2)}% 으로 구성되어 있고,
                열량은 {item['열량'].toFixed(1)}kcal/kg 이고, PFC비율은 {Math.round(item['P']*100).toFixed(1)}:{Math.round(item['F']*100).toFixed(1)}:{Math.round(item['C']*100).toFixed(1)} 이예요.
                이 사료는 {item['수입사']}에서 샘플을 받아보실 수 있어요.
                </Description>
            </TextContainer>
        </Container>

    ) : (
        <AppLoading
            onFinish={setIsReady(true)}
            onError={console.warn}
        />
    )
}