import React, { useState } from 'react';
import MainWeatherCard from './MainWeatherCard'
import SubWeatherCard from './SubWeatherCard'
import { makeStyles } from '@material-ui/core/styles';


const WeatherForecastContainer = ({ allWeatherData, cities }) => {
    const [cityChosen, setCityChosen] = useState('all')

    const classes = useStyles();

    const weatherData = cityChosen !== 'all' ? allWeatherData.filter(data => data.cityId == cityChosen) : allWeatherData

    const convertTemp = (temp) => {
        return (temp - 273.15).toFixed(0)
    }

    const getPrecipitation = (snowOrRain) => {
        if (snowOrRain) {
            if (snowOrRain['3h']) {
                return snowOrRain['3h']
            } else {
                return snowOrRain['1h']
            }
        }
        return 0
    }
    return (
        <main className={classes.weatherForecastContainer}>
            <select className={classes.dropDown} id="cities" name="cities" onChange={(e) => setCityChosen(e.target.value)}>
                <option value="all">Kaikki kaupungit</option>
                {cities.map(city =>
                    <option key={city.cityId} value={city.cityId}>{city.cityName}</option>)}
            </select>

            {weatherData.map(data =>
                <section key={data.cityId}>
                    <MainWeatherCard
                        weatherData={data.currentWeatherData}
                        getPrecipitation={getPrecipitation}
                        convertTemp={convertTemp}
                        cityName={data.cityName}
                    />
                    <div className={classes.SubWeatherCardContainer}>
                        {data.threeHourWeatherData.list.slice(1, 6).map(threeHourData =>
                            <SubWeatherCard
                                key={threeHourData.dt}
                                weatherData={threeHourData}
                                getPrecipitation={getPrecipitation}
                                convertTemp={convertTemp}
                            />
                        )}
                    </div>
                </section>
            )}
        </main>
    );
}

export default WeatherForecastContainer;

const useStyles = makeStyles({
    SubWeatherCardContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between'
    },
    weatherForecastContainer: {
        padding: '10pt'
    },
    dropDown: {
        width: '100%',
        height: '30pt',
        fontSize: '13pt',
        color: '#262626'
    }
});