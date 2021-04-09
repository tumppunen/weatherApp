import React, { useState, useEffect } from 'react';
import WeatherForecastContainer from './components/WeatherForecastContainer';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  headerBar: {
    backgroundColor: '#FFFFFF',
    height: '50pt',
    borderBottom: '1px solid #E6E6E6',
    textAlign: 'center'
  },
  appHeader: {
    color: '#262626',
    fontSize: '23pt',
    position: 'relative',
    top: 15
  }
});

function App() {
  const apiKey = 'enterApiKeyHere'

  const [weatherData, setWeatherData] = useState(null)
  const [cityChosen, setCityChosen] = useState('all')

  const classes = useStyles();

  const cities = [
    { cityName: 'Tampere', cityId: '634964' },
    { cityName: 'Jyväskylä', cityId: '655195' },
    { cityName: 'Kuopio', cityId: '650225' },
    { cityName: 'Helsinki', cityId: '658225' }
  ]

  useEffect(async () => {
    const data = cities.map(async (city) => {
      const threeHourWeatherRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${city.cityId}&appid=${apiKey}`)
      const currentWeatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.cityId}&appid=${apiKey}`)
      const threeHourWeatherData = await threeHourWeatherRes.json()
      const currentWeatherData = await currentWeatherRes.json()
      return {
        cityId: city.cityId,
        currentWeatherData,
        threeHourWeatherData
      }
    })
    const weatherData = await Promise.all(data)
    console.log(weatherData)
    setWeatherData(weatherData)
  }, []);


  return (
    <div>
      <div className={classes.headerBar}>
        <div className={classes.appHeader}>
          Säätutka
        </div>
      </div>
      {weatherData && (
        <WeatherForecastContainer weatherData={weatherData} cityChosen={cityChosen} cities={cities} setCityChosen={setCityChosen} />
      )}
    </div>
  );
}

export default App;
