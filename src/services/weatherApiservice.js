export const getCurrentWeatherData = async (city, apiKey) => {
    const currentWeatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.cityId}&appid=${apiKey}`)
    if (currentWeatherRes.status !== 200) {
        return Promise.reject()
    }
    return await currentWeatherRes.json()
}

export const getThreeHourWeatherData = async (city, apiKey) => {
    const threeHourWeatherRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${city.cityId}&appid=${apiKey}`)
    if (threeHourWeatherRes.status !== 200) {
        return Promise.reject()
    }
    return await threeHourWeatherRes.json()
}