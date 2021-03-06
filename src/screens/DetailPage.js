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
        "??????": "9CARES KITTEN",
        "id": 2,
        "?????????": "??????????????????",
        "?????????": "????????????",
        "Manufacturer": "Perfect Companion Group",
        "Brand": "9CARES",
        "Formula": "KITTEN",
        "Process": "Extrusion",
        "??????(kg)": 6.0,
        "??????": 50000,
        "100g?????????": 833.3333333333334,
        "Carbonate": 0.24999999999999997,
        "Protein": 0.36,
        "Fat": 0.16,
        "?????????": 0.04,
        "?????????": 0.09,
        "??????": 0.1,
        "??????": 0.01,
        "???": 0.008,
        "??????": 3900.0,
        "P+F+C": 388.0,
        "P": 0.3711340206185567,
        "F": 0.3711340206185567,
        "C": 0.25773195876288657,
        "Ca:P": 0.8,
        "??????": "A",
        "Probiotics": false,
        "Cranberry": false,
        "Yucca": false,
        "meal-free": true,
        "Grain-free": false,
        "Oil-Fat": "Poultry fat",
        "??????": 2,
        "???????????????": [
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
            title: item['??????']
        })
    }, [])

    const DescriptionText = `????????? ${item['Manufacturer'].replace('.','_')}??? ????????? ${item['?????????']} ${item['??????']} ????????? ${item['Process']} ???????????? ??????????????????, ???????????? ?????????: ${item['Protein'].toFixed(1)}%, ??????: ${item['Fat'].toFixed(1)}%, ????????????: ${item['Carbonate'].toFixed(1)}%, ?????????: ${item['?????????'].toFixed(1)}%, ?????????: ${item['?????????'].toFixed(1)}%, ??????: ${item['??????'].toFixed(1)}%, ??????: ${item['??????'].toFixed(2)}%, ???: ${item['???'].toFixed(2)}% ?????? ???????????? ??????, ????????? ${item['??????'].toFixed(1)}kcal/kg ??????, PFC????????? ${Math.round(item['P']*100).toFixed(1)}:${Math.round(item['F']*100).toFixed(1)}:${Math.round(item['C']*100).toFixed(1)} ?????????. ??? ????????? ${item['?????????']}?????? ????????? ???????????? ??? ?????????.`

    const _share = () => Share.share({

        message: `${DescriptionText}

    ??????: "????????? ???????????? ??????????????? ?????????"
    https://catminzzi.tistory.com/search/${item['?????????']}`,
    url: `https://catminzzi.tistory.com/search/${item['?????????']}`,
    title: item['??????']
    })

    return isReady ? (
        <Container>
            <StyledImage source={{uri:images.sample}}/>
            <TextContainer>
                <Title>{item['??????']}</Title>
                <Description>{item['?????????']} | {item['Manufacturer']}</Description>
                <Description>??? ????????? ?????? ?????????? {item["Probiotics"] ? "O" : "X"}</Description>
                <Description>?????? ????????? ?????? ????????????? {item["Cranberry"] ? "O" : "X"}</Description>
                <Description>????????? ???????????? ?????????????????? {item["Yucca"] ? "O" : "X"}</Description>
                <Description>????????????????????????? {item["Grain-free"] ? "O" : "X"}</Description>
                <Description>?????? ????????? ???????????????? {item["Oil-Fat"]}</Description>
                <Description>????????????: {item['100g?????????'].toFixed(1)}???/100g</Description>
            </TextContainer>
            <TextContainer>
                <SubTitle>????????? ??????</SubTitle>
                <Description>{item['???????????????'].join(', ')}</Description>
            </TextContainer>
            <NutrientbarContainer windowWidth={windowWidth}>
                <Nutrientbar windowWidth={windowWidth} style={{backgroundColor:"#FFA07A"}} percent={item['P']}><Nutrience >P: ???????????????!!</Nutrience></Nutrientbar>
                <Nutrientbar windowWidth={windowWidth} style={{backgroundColor:"#B22222"}} percent={item['F']}><Nutrience >F: ??? ????????????!</Nutrience></Nutrientbar>
                <Nutrientbar windowWidth={windowWidth} style={{backgroundColor:"#6A5ACD"}} percent={item['C']}><Nutrience >C: ??????????????????</Nutrience></Nutrientbar>
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