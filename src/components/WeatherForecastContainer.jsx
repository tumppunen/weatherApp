import React,  { useState } from 'react';
import MainWeatherCard from './MainWeatherCard'
import SubWeatherCard from './SubWeatherCard'
import { makeStyles } from '@material-ui/core/styles';

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
        // backgroundColor: '#FFFFFF',
        // border: '1pt solid #E6E6E6',
        // borderRadius: '5pt',
        // padding: '5pt',
        // fontSize: '13pt',
        // color: '#262626',
        // appearance: 'none'
    }
});

const WeatherForecastContainer = (props) => {
    const [cityChosen, setCityChosen] = useState('all')

    const classes = useStyles();
    
    const weatherData = cityChosen !== 'all' ? props.weatherData.filter(data => data.cityId == cityChosen) : props.weatherData

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
        <div>
            <div className={classes.weatherForecastContainer}>
                <select className={classes.dropDown} id="cities" name="cities" onChange={(e) => setCityChosen(e.target.value)}>
                    <option value="all">Kaikki kaupungit</option>
                    {props.cities.map(city => <option key={city.cityId} value={city.cityId}>{city.cityName}</option>)}
                </select>

                {weatherData.map(data =>
                    <div key={data.cityId}>
                        <MainWeatherCard weatherData={data.currentWeatherData} getPrecipitation={getPrecipitation} />
                        <div className={classes.SubWeatherCardContainer}>
                            {data.threeHourWeatherData.list.slice(1, 6).map(threeHourData =>
                                <SubWeatherCard key={threeHourData.dt} weatherData={threeHourData} getPrecipitation={getPrecipitation} />
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default WeatherForecastContainer;
