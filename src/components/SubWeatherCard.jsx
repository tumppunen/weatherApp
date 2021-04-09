import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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



const SubWeatherCard = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.secondaryText13pt}>
                {new Date(props.weatherData.dt_txt).getHours()}:00
            </div>
            <div>
                <img className={classes.icon} src={`http://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}.png`} />
            </div>
            <div className={classes.primaryText15pt}>
                {(props.weatherData.main.temp - 273.15).toFixed(0)}°C
            </div>
            <div className={classes.secondaryData}>
                <div className={classes.secondaryText10pt}>
                    {props.weatherData.wind.speed} m/s
                    </div>
                <div className={classes.secondaryText10pt}>
                    {props.weatherData.main.humidity} %
                    </div>
                <div className={classes.secondaryText10pt}>
                    {props.getPrecipitation(props.weatherData.rain || props.weatherData.snow)} mm
                    </div>
            </div>
        </div>
    )
}

export default SubWeatherCard;
