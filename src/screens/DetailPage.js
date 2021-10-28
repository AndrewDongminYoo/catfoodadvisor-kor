import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { images } from '../utils/storage'
import { firebase_db } from '../utils/firebase';
import AppLoading from 'expo-app-loading';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Share } from 'react-native';


const Container = styled.ScrollView`
    background-color: #FFEBCD;
`;

const StyledImage = styled.Image`
    height: 250px;
    width: 250px;
    align-self: center;
    margin-top: 40px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: #fff;
`;

const TextContainer = styled.View`
    background-color: #fff;
    margin-left: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: 900;
    color: #000;
    padding: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const SubTitle = styled.Text`
    font-size: 16px;
    font-weight: 900;
    color: #000;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Description = styled.Text`
    margin-top: 10px;
    color: #000;
    line-height: 18px;
    font-size: 14px;
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
        (windowWidth - 40) *percent}px;
    align-items: center;
    border-width: 1.5px;
    border-color: #8B4513;
`;

const Nutrience = styled.Text`
    text-align: center;
    font-weight: 900;
    font-size: 12px;
    text-align-vertical: center;
    color: #fff;
    line-height: 30px;
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
        "Oil-Fat": "Poultry fat",
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
        console.log(params.id.id)
        const { id } = params.id;
        firebase_db
            .ref('/data/'+String(id))
            .once('value')
            .then(snapshot => {
                let item = snapshot.val();
                setItem(item)
                setIsReady(true)
            })
        navigation.setOptions({
            title: item['이름']
        })
    }, [])

    const DescriptionText = `제조사 ${item['Manufacturer'].replace('.','_')}의 브랜드 ${item['브랜드']} ${item['이름']} 제품은 ${item['Process']} 공법으로 생산되었으며, 영양소는 단백질: ${item['Protein'].toFixed(1)}%, 지방: ${item['Fat'].toFixed(1)}%, 탄수화물: ${item['Carbonate'].toFixed(1)}%, 조섬유: ${item['조섬유'].toFixed(1)}%, 조회분: ${item['조회분'].toFixed(1)}%, 수분: ${item['수분'].toFixed(1)}%, 칼슘: ${item['칼슘'].toFixed(2)}%, 인: ${item['인'].toFixed(2)}% 으로 구성되어 있고, 열량은 ${item['열량'].toFixed(1)}kcal/kg 이고, PFC비율은 ${Math.round(item['P']*100).toFixed(1)}:${Math.round(item['F']*100).toFixed(1)}:${Math.round(item['C']*100).toFixed(1)} 이예요. 이 사료는 ${item['수입사']}에서 샘플을 받아보실 수 있어요.`

    const _share = () => Share.share({

        message: `${DescriptionText}

    출처: "꼬리와 돈민찌의 고양이사료 이야기"
    https://catminzzi.tistory.com/search/${item['브랜드']}`,
    url: `https://catminzzi.tistory.com/search/${item['브랜드']}`,
    title: item['이름']
    })

    return isReady ? (
        <Container>
            <StyledImage source={{uri:images.sample}}/>
            <TextContainer>
                <Title>{item['이름']}</Title>
                <Description>{item['브랜드']} | {item['Manufacturer']}</Description>
                <Description>장 건강에 좋은 유익균? {item["Probiotics"] ? "O" : "X"}</Description>
                <Description>요로 건강에 좋은 크랜베리? {item["Cranberry"] ? "O" : "X"}</Description>
                <Description>변취를 줄여주는 유카시디게라 {item["Yucca"] ? "O" : "X"}</Description>
                <Description>그레인프리인가요? {item["Grain-free"] ? "O" : "X"}</Description>
                <Description>어떤 오일을 사용했나요? {item["Oil-Fat"]}</Description>
                <Description>평균가격: {item['100g당가격'].toFixed(1)}원/100g</Description>
            </TextContainer>
            <TextContainer>
                <SubTitle>사용된 원료</SubTitle>
                <Description>{item['사용된원료'].join(', ')}</Description>
            </TextContainer>
            <NutrientbarContainer windowWidth={windowWidth}>
                <Nutrientbar windowWidth={windowWidth} style={{backgroundColor:"#FFA07A"}} percent={item['P']}><Nutrience >P: 단백질이지!!</Nutrience></Nutrientbar>
                <Nutrientbar windowWidth={windowWidth} style={{backgroundColor:"#B22222"}} percent={item['F']}><Nutrience >F: 난 지방이다!</Nutrience></Nutrientbar>
                <Nutrientbar windowWidth={windowWidth} style={{backgroundColor:"#6A5ACD"}} percent={item['C']}><Nutrience >C: 탄수화물헤헤</Nutrience></Nutrientbar>
            </NutrientbarContainer>
            <TextContainer>
                <Description>
                    {DescriptionText}
                </Description>
                <Button
                    buttonStyle={{
                        marginVertical: 20,
                        backgroundColor: "#BC8F8F"
                    }}
                    title=" Share "
                    onPress={()=> _share()}
                    icon={
                        <Icon
                            name="share-alt"
                            size={20}
                            color="#FFF8DC"
                        />}
                />
            </TextContainer>
        </Container>

    ) : (
        <AppLoading
            onFinish={setIsReady(true)}
            onError={console.warn}
        />
    )
}