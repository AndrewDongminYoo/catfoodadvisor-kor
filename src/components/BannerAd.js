import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import Constants from 'expo-constants';
import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

const BannerAd = isEmpty => {

  const adUnitID = Platform.select({
    ios: "ca-app-pub-4457293335388562/7614368509",
    android: "ca-app-pub-4457293335388562/7025063764"
  })
  const bannerSize = [
    "banner",
    "largeBanner",
    "mediumRectangle",
    "fullBanner",
    "leaderboard",
    "smartBannerPortrait",
    "smartBannerLandscape"
  ]

  return Constants.isDevice && !__DEV__ ? (
    <AdMobBanner
      bannerSize={isEmpty ? bannerSize[3] : bannerSize[4]}
      servePersonalizedAds={true}
      adUnitID={adUnitID}
    />
  ) : (
    <AdMobBanner
      bannerSize={isEmpty ? bannerSize[3] : bannerSize[4]}
      servePersonalizedAds={true}
      adUnitID="ca-app-pub-3940256099942544/6300978111"
    />
  )
}

export default BannerAd