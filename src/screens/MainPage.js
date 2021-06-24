import React,{ useState, useEffect } from 'react';
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../utils/firebase';
import AppLoading from 'expo-app-loading';
import Weather from '../components/Weather';
import { images } from '../utils/storage';
import CateButton from '../components/CateButton';
import { View, Text, FlatList, Image } from 'react-native';
import data from '../../SARYOURL.json'
import { _koreaninitialize } from '../utils/common';
import { initial } from 'lodash';

const Container = styled.View`
  background-color: #fff;
  padding-top: 10;
  padding-bottom: 50;
`;

const MainImage = styled.Image`
  width: 95%;
  height: 280;
  border-radius: 10;
  margin-top: 20;
  align-self: center;
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

export default function MainPage({navigation, route}) {

  const [isReady, setIsReady] = useState(false);
  const [brands, setBrands] = useState([])
  const [brandFilter, setBrandFilter] = useState([])

  useEffect(()=>{
    setBrands(data)
    setBrandFilter(data)
    console.log(data)
  }, [])

  const _filterBrand = target => {
    console.log(target)
    setBrandFilter(brands.filter((brand)=>{
      return _koreaninitialize(brand['Korean']) == target
    }))
  }

  return isReady ? (
    <Container>
      <StatusBar style="black" />
      <Weather/>
      <MainImage source={{uri: images.main}}/>
      <CateButton propsFunction={target => {
        _filterBrand(target)
      }}/>
      <FlatList
        keyExtractor={item => item['id']}
        data={brandFilter}
        windowSize={6}
        renderItem={({ item }) => (
          <ItemContainer>
            <ItemTextContainer>
              <ItemTitle>{ item['Korean'] } | { item['Brand'] }</ItemTitle>
              <ItemDescription>{ item['URL'] }</ItemDescription>
            </ItemTextContainer>
          </ItemContainer>
        )}
      />
    </Container>
  ) : (
    <AppLoading
      onFinish={setIsReady(true)}
      onError={console.warn}
    />
  )
}