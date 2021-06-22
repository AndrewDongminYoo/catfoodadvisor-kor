import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native'

const Weather = ({ icon }) => {

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
    <MaterialCommunityIcons
      name={objWeather[icon]}
      size={24}
      color="black"
    />
  )
}

export default Weather;