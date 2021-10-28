import React,{ useState, useEffect } from 'react';
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../utils/firebase';
import AppLoading from 'expo-app-loading';
import { images } from '../utils/storage';
import { FlatList } from 'react-native';
import { _koreaninitialize } from '../utils/common';
import { Item, Weather, CateButton, BannerAd } from '../components';

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
  align-items: stretch;
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
        console.log(data.length)
        setIsReady(true)
      })
  }, [])


  const _filterBrand = target => {
    console.log(target)
    setBrandFilter(brands.filter((brand)=>{
      return _koreaninitialize(brand['브랜드']) == target
    }))
    console.log(brandFilter.length)
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
          ListHeaderComponent={<BannerAd/>}
          ListEmptyComponent={<BannerAd isEmpty={true}/>}
          renderItem={({ item }) => (
            <Item item={item} onPress={_handleItemClick}/>
          )}
        />
      </FlatListContainer>
    </Container>
  ) : <AppLoading />
}