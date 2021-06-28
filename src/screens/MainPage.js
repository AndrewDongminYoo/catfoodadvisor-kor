import React,{ useState, useEffect } from 'react';
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../utils/firebase';
import AppLoading from 'expo-app-loading';
import Weather from '../components/Weather';
import { images } from '../utils/storage';
import CateButton from '../components/CateButton';
import { FlatList, Platform } from 'react-native';
import { _koreaninitialize } from '../utils/common';
import Item from '../components/Item';
import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

const Container = styled.View`
  background-color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
`;

const MainImage = styled.Image`
  width: 95%;
  height: 280px;
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [adUnitId, setAdUnitId] = useState("ca-app-pub-4457293335388562/7025063764")

  useEffect(()=>{
    firebase_db.ref('/data')
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        setBrands(data)
        setBrandFilter(data)
        console.log(data.length)
        setIsReady(true)
      })
    if (Platform.OS === 'ios') {
      setAdUnitId("ca-app-pub-4457293335388562/7614368509")
    }
  }, [])


  const _filterBrand = target => {
    console.log(target)
    setBrandFilter(brands.filter((brand)=>{
      return _koreaninitialize(brand['브랜드']) == target
    }))
    console.log(brandFilter)
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
          data={brandFilter}
          keyExtractor={item => String(item.id)}
          windowSize={2}
          initialNumToRender={3}
          renderItem={({ item }) => (
            <Item item={item} onPress={_handleItemClick}/>
          )}
        />

      </FlatListContainer>
    </Container>
  ) : null;
}