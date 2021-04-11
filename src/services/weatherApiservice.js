export const getWeatherData = async (cities, apiKey) => {
    const data = cities.sort((a, b) => a.cityName.localeCompare(b.cityName)).map(async (city) => {
        const threeHourWeatherRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${city.cityId}&appid=${apiKey}`)
        const currentWeatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.cityId}&appid=${apiKey}`)
        const threeHourWeatherData = await threeHourWeatherRes.json()
        const currentWeatherData = await currentWeatherRes.json()

        return {
            cityName: city.cityName,
            cityId: city.cityId,
            currentWeatherData,
            threeHourWeatherData
        }
    })
    return await Promise.all(data)
}