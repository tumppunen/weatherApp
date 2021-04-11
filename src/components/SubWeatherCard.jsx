import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const SubWeatherCard = ({ weatherData, getPrecipitation, convertTemp }) => {
    const classes = useStyles();

    return (
        <article className={classes.root}>
            <p className={classes.secondaryText13pt}>
                {new Date(weatherData.dt_txt).getHours()}:00
            </p>
            <div>
                <img className={classes.icon} src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} />
            </div>
            <p className={classes.primaryText15pt}>
                {convertTemp(weatherData.main.temp)}°C
            </p>
            <div className={classes.secondaryData}>
                <p className={classes.secondaryText10pt}>
                    {weatherData.wind.speed} m/s
                </p>
                <p className={classes.secondaryText10pt}>
                    {weatherData.main.humidity} %
                </p>
                <p className={classes.secondaryText10pt}>
                    {getPrecipitation(weatherData.rain || weatherData.snow)} mm
                </p>
            </div>
        </article>
    )
}

export default SubWeatherCard;

const useStyles = makeStyles({
    root: {
        maxWidth: '100pt',
        marginTop: '15pt',
        textAlign: 'center',
        paddingTop: '5pt',
        border: '1pt solid #E6E6E6',
        borderRadius: '5pt',
        backgroundColor: '#FFFFFF'
    },
    primaryText15pt: {
        fontSize: '15pt',
        color: '#262626'
    },
    secondaryText13pt: {
        fontSize: '13pt',
        color: '#70757A'
    },
    secondaryText10pt: {
        fontSize: '10pt',
        color: '#70757A'
    },
    icon: {
        width: '30pt',
        height: '30pt'
    },
    secondaryData: {
        textAlign: 'center',
        backgroundColor: '#E5F6FD',
        padding: '5pt',
        marginTop: '5pt',
        position: 'relative',
        bottom: 0
    }
});