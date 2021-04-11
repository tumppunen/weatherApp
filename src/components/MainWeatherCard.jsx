import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const MainWeatherCard = ({ weatherData, getPrecipitation, convertTemp, cityName }) => {
    const classes = useStyles();

    const getEndingForDate = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const date = new Date()

    return (
        <article className={classes.root}>
            <div className={classes.content}>
                <div>
                    <h2 className={classes.primaryText19pt}>
                        {cityName}
                    </h2>
                    <p className={classes.secondaryText13pt}>
                        {weatherData.weather[0].description}
                    </p>
                </div>
                <div className={classes.tempData}>
                    <img className={classes.icon} src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} />
                    <span className={classes.primaryText26pt}>{convertTemp(weatherData.main.temp)} °C</span>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.timeData}>
                    <p className={classes.primaryText15pt}>
                        {date.toLocaleString('en-EN', { month: 'short', day: 'numeric' })}{getEndingForDate(date.getDate)}
                    </p>
                    <p className={classes.secondaryText13pt}>
                        {date.getHours()}:{date.getMinutes() < 10 ? '0' : '' + date.getMinutes()}
                    </p>
                </div>
                <div className={classes.secondaryData}>
                    <p className={classes.secondaryText13pt}>
                        Wind: {weatherData.wind.speed} m/s
                    </p>
                    <p className={classes.secondaryText13pt}>
                        Humidity: {weatherData.main.humidity} %
                    </p>
                    <p className={classes.secondaryText13pt}>
                        Prepicitation (3h): {getPrecipitation(weatherData.rain || weatherData.snow)} mm
                    </p>
                </div>
            </div>
        </article>
    );
}

export default MainWeatherCard;

const useStyles = makeStyles({
    root: {
        marginTop: '15pt',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: '10pt',
        border: '1pt solid #E6E6E6',
        borderRadius: '5pt',
        backgroundColor: '#FFFFFF',
        height: '125pt'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    primaryText26pt: {
        fontSize: '26pt',
        color: '#262626',

    },
    primaryText19pt: {
        fontSize: '19pt',
        color: '#262626',
    },
    primaryText15pt: {
        fontSize: '15pt',
        color: '#262626'
    },
    secondaryText13pt: {
        fontSize: '13pt',
        color: '#70757A'
    },
    icon: {
        width: '50pt',
        height: '50pt',
        position: 'relative',
        top: -13
    },
    secondaryData: {
        textAlign: 'right',
        position: 'relative',
        bottom: -35
    },
    timeData: {
        position: 'relative',
        bottom: -51
    },
    tempData: {
        display: 'inline-flex'
    },

});