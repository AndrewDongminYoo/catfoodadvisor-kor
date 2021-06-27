import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import * as Location from "expo-location";
import axios from "axios";
import styled from 'styled-components/native';

const Container = styled.View`
  top: 10px;
  right: 10px;
  z-index: 1;
  position: absolute;
`;

const IconContainer = styled.View`
  z-index: 1;
`;

const StyledText = styled.Text`
  align-self: flex-end;
  padding-right: 20;
  text-transform: capitalize;
  align-items: flex-end;
  font-weight: 700;
`;

const WeatherIcon = ({icon}) => {

  const objWeather = {
    "01d": "weather-sunny",
    "02d": "weathe-partly-cloudy",
    "03d": "weather-cloudy",
    "04d": "weather-cloudy",
    "09d": "weather-pouring",
    "10d": "weather-rainy",
    "11d": "weather-lightning-rainy",
    "13d": "weather-partly-snowy",
    "50d": "weather-hazy",
    "01n": "weather-night",
    "02n": "weather-night-partly-cloudy",
    "03n": "weather-cloudy",
    "04n": "weather-cloudy",
    "09n": "weather-pouring",
    "10n": "weather-rainy",
    "11n": "weather-lightning-rainy",
    "13n": "weather-snowy",
    "50n": "weather-fog"
  }

  return (
    <IconContainer>
      <MaterialCommunityIcons
        name={objWeather[icon]}
        size={24}
        color="black"
      />
    </IconContainer>
  )
}

const Weather = () => {

  const [location, setLocation] = useState({});
  const [weatherIcon, setWeatherIcon] = useState('01d')
  const [weather, setWeather] = useState({temp: 0, description: ""})

  useEffect(()=>{
      const _getCurrentLocationWeather = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;}
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords
      console.log(latitude, longitude)
      setLocation({ latitude, longitude });
      const API_key = "cfc258c75e1da2149c33daffd07a911d"
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`)
      const response = result.data
      const temp = response.main.temp
      const description = response.weather[0].description
      const icon = response.weather[0].icon
      setWeatherIcon(icon)
      console.log(temp, description, icon)
      setWeather({temp, description})
    }
    _getCurrentLocationWeather()
  }, [])

  return (
    <Container>
      <StyledText>It's {weather.temp}℃</StyledText>
      <StyledText>{`& ${weather.description}.`}</StyledText>
      <StyledText><WeatherIcon icon={weatherIcon}/><WeatherIcon icon={weatherIcon}/></StyledText>
    </Container>
  )
}

export default Weather;