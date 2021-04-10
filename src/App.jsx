import React, { useState, useEffect } from 'react';
import WeatherForecastContainer from './components/WeatherForecastContainer';
import { makeStyles } from '@material-ui/core/styles';
import { getWeatherData } from './services/weatherApiservice'

import config from './config'

function App() {

  const { apiKey, cities } = config
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)


  const classes = useStyles();

  useEffect(() => {
    (async function fetchData() {
        const weatherData = await getWeatherData(cities, apiKey)
        console.log(weatherData)
        setWeatherData(weatherData)
    })()
  }, []);

  return (
    <div>
      <div className={classes.headerBar}>
        <div className={classes.appHeader}>
          Säätutka
        </div>
      </div>
      {error && error}
      {weatherData && (
        <WeatherForecastContainer allWeatherData={weatherData} cities={cities} />
      )}
    </div>
  );
}

export default App;

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