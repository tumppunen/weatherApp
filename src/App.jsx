import React, { useState, useEffect } from 'react';
import WeatherForecastContainer from './components/WeatherForecastContainer';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCurrentWeatherData, getThreeHourWeatherData } from './services/weatherApiservice'

import config from './config'

function App() {

  const { apiKey, cities } = config
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const weatherData = await Promise.all(cities.sort((a, b) => a.cityName.localeCompare(b.cityName)).map(async (city) => {
          const currentWeatherData = await getCurrentWeatherData(city, apiKey)
          const threeHourWeatherData = await getThreeHourWeatherData(city, apiKey)
          return {
            cityName: city.cityName,
            cityId: city.cityId,
            currentWeatherData,
            threeHourWeatherData
          }
        }))
        setWeatherData(weatherData)
      } catch (error) {
        setError('Error fetching data')
      }
    })()
  }, []);

  return (
    <main>
      <header className={classes.headerBar}>
        <h1 className={classes.appHeader}>
          Säätutka
        </h1>
      </header>
      {error ? (
        <div className={classes.error}>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          {!error && weatherData ? (
            <WeatherForecastContainer allWeatherData={weatherData} cities={cities} />
          ) : (
            <div className={classes.spinner}>
              <CircularProgress size="50pt" />
            </div>
          )}
        </div>
      )}
    </main>
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
  },
  error: {
    textAlign: 'center',
    fontSize: '15pt',
    padding: '50pt'
  },
  spinner: {
    textAlign: 'center',
    padding: '50pt'
  }
});