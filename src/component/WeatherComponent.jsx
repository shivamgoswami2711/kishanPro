import React, { useState } from 'react'
import { useStateValue } from "../Stateprovider"

function WeatherComponent() {
    const [state] = useStateValue()
    // const [weather] = useState(window.localStorage.data !== undefined ? JSON.parse(window.localStorage.weatherData) : { weather: [{ description: '', main: '' }], main: {}, sys: {}, wind: { deg: "", speed: "" } });
    const [windowName, setWindowName] = useState('');
    // const [tamp, setTamp] = useState([])
    const weatherData = state.data
    const weatherDataList = weatherData.list
    const weather = weatherDataList[0]
    const date = new Date(weather.dt_txt)
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

    // wind direction calulate using deg
    function directionFunc(d) {
        let directions = ['Northerly', 'North Easterly', 'Easterly', 'South Easterly', 'Southerly', 'South Westerly', 'Westerly', 'North Westerly'];
        d += 22.5;
        d < 0 ? d = 360 - Math.abs(d) % 360 : d = d % 360;
        let w = parseInt(d / 45);
        return `${directions[w]}`;
    }

    // opan window
    function Morewether() {
        return (<div className="popup">
            <div className="window">
                <span className="cencel" onClick={() => setWindowName('')}>X</span>
                <div className="weatherForcastContainer">
                <div className="location">
                    <h1>{weatherData.city.name}</h1><br /><h4>{weatherData.city.country}</h4>
                </div>
                    <div className="rowDate">
                        <div className="hoursColumn">
                            {weatherDataList.map(list => {
                                const dateList = new Date(list.dt_txt)
                                return (<div>
                                    <div className="weatherStatus">
                                        <img className="weatherImgStatus" src={`https://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`} alt="" />
                                        <h6 className="weatherTextStatus">{list.weather[0].main}</h6>
                                    </div>
                                    <div className="tamp">temp</div>
                                    <div className="temperature"><h6>{(list.main.temp - 273.15).toFixed(2)}°C</h6> </div>
                                    <div className="windStatus">
                                        <i className="fas fa-wind"></i>
                                        <h6>{(list.wind.speed * 1.6).toFixed(2)}km/<span>{directionFunc(list.wind.deg)}</span></h6>
                                    </div>
                                    <div className="carrentTime">
                                        <h1>{dateList.getHours().toString().length === 1 ? `0${dateList.getHours()}` : dateList.getHours()}:{dateList.getMinutes().toString().length === 1 ? `0${dateList.getMinutes()}` : dateList.getMinutes()}</h1><br />
                                        <h4>{dateList.getDate().toString().length === 1 ? `0${dateList.getDate()}` : dateList.getDate()}/<span>{monthName[dateList.getMonth()]}</span></h4>
                                    </div>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }


    return (
        <>
            <div className="weatherContainer">
                <div className="button" onClick={() => setWindowName("weather")}>more</div>
                <div className="discription">
                    <h5>{weather.weather[0].description}</h5>
                </div>
                <div className="weatherStatus">
                    <img className="weatherImgStatus" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                    <h6 className="weatherTextStatus">{weather.weather[0].main}</h6>
                </div>
                <div className="temperature"><h6>{(weather.main.temp - 273.15).toFixed(2)}°C</h6> </div>
                <div className="humidity"><h5>Humidity</h5><h6>{weather.main.humidity}%</h6> </div>

                <div className="windStatus">
                    <i className="fas fa-wind"></i><br />
                    <h6>{(weather.wind.speed * 1.6).toFixed(2)}km/<span>{directionFunc(weather.wind.deg)}</span></h6>
                </div>
                <div className="location">
                    <h1>{weatherData.city.name}</h1><br /><h4>{weatherData.city.country}</h4>
                </div>
                <div className="carrentTime">
                    <h1>{date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours()}:{date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()}</h1><br />
                    <h4>{date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate()}/<span>{monthName[date.getMonth()]}</span></h4>
                </div>
            </div>
            <section className="popupSection">
                {windowName === "weather" ? Morewether() : ""}
            </section>
        </>
    )
}

export default React.memo(WeatherComponent)
