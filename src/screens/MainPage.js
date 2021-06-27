import React,{ useState, useEffect } from 'react';
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../utils/firebase';
import AppLoading from 'expo-app-loading';
import Weather from '../components/Weather';
import { images } from '../utils/storage';
import CateButton from '../components/CateButton';
import { View, Text, FlatList, Image } from 'react-native';
import data from '../../수입사료.json'
import { _koreaninitialize } from '../utils/common';
import Item from '../components/Item';

const Container = styled.View`
  background-color: #fff;
  padding-top: 10;
  padding-bottom: 10;
  align-items: center;
`;

const MainImage = styled.Image`
  width: 95%;
  height: 280;
  border-radius: 10px;
  margin-top: 20px;
  align-self: center;
`;

const FlatListContainer = styled.View`
  height: 440px;
  width: 100%;
  align-items: center;
`;

export default function MainPage({navigation, route}) {

  const [isReady, setIsReady] = useState(false);
  const [brands, setBrands] = useState([])
  const [brandFilter, setBrandFilter] = useState([])

  useEffect(()=>{
    firebase_db.ref('/data')
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        setBrands(data)
        setBrandFilter(data)
        console.log(data)
      })
  }, [])

  const _filterBrand = target => {
    console.log(target)
    setBrandFilter(brands.filter((brand)=>{
      return _koreaninitialize(brand['브랜드']) == target
    }))
  }

  const _handleItemClick = item => {
    navigation.navigate('Detail', item)
  }

  return isReady ? (
    <Container>

      <StatusBar style="black" />
      <Weather/>
      <MainImage source={{uri: images.main}}/>
      <CateButton propsFunction={target => {
        _filterBrand(target)
      }}/>

      <FlatListContainer>
        <FlatList
          keyExtractor={item => item['name']}
          data={brandFilter}
          windowSize={6}
          renderItem={({ item }) => (
            <Item item={item} onPress={_handleItemClick}/>
          )}
        />
      </FlatListContainer>
    </Container>
  ) : (
    <AppLoading
      onFinish={setIsReady(true)}
      onError={console.warn}
    />
  )
}