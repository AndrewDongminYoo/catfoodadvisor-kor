import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { images } from '../utils/storage'
import Constants from 'expo-constants'
import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

const ItemContainer = styled.TouchableOpacity`
  height: 120px;
  width: 100%;
  padding: 10px;
  flex-direction: row;
  justify-content: flex-start;
  display: flex;
`;

const ImageFrame = styled.Image`
  width: 100px;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 10px;
  flex: 1;
`;

const ItemTextContainer = styled.View`
  flex-direction: column;
  flex: 3;
`;

const ItemTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const ItemDescription = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const Item = ({item: { id, 이름, 사용된원료}, onPress}) => {


  useEffect(()=>{
    const productionID = Platform.select({
      ios: 'ca-app-pub-4457293335388562/8540437369',
      android: 'ca-app-pub-4457293335388562/8442566140',
    });
    const testID = 'ca-app-pub-3940256099942544/1033173712';
    const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;
    AdMobInterstitial.setAdUnitID(adUnitID)
    AdMobInterstitial.addEventListener("interstitialDidLoad", () => console.log("MainAd Load"));
    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => console.log("MainAd FailToLoad"));
    AdMobInterstitial.addEventListener("interstitialDidOpen", () => console.log("MainAd Open"));
    AdMobInterstitial.addEventListener("interstitialDidClose", () => console.log("MainAd Close"));
  },[])

  const goDetail = async id =>{
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
    await onPress({id})
  }

  return (
    <ItemContainer onPress={() => goDetail({id})}>
      <ImageFrame resizeMode="cover" source={{uri:images.sample}}/>
      <ItemTextContainer>
        <ItemTitle numberOfLines={1}>{ 이름 }</ItemTitle>
        <ItemDescription numberOfLines={4}>{ 사용된원료.join(', ') }</ItemDescription>
      </ItemTextContainer>
    </ItemContainer>
  )
}


export default React.memo(Item);