import React,{useState} from 'react'

function WeatherComponent() {
    const [weather, setWeather] = useState(window.localStorage.data !== undefined?JSON.parse(window.localStorage.weatherData) :{weather:[{description:'',main:''}],main:{},sys:{},wind:{deg:"",speed:""}});
    const [date, setDate] = useState(new Date())
    const [windowName, setWindowName] = useState('');
    const [tamp, setTamp] = useState([])

    // to stop infainite reander
    var time = setInterval(()=>setDate(new Date()), 500 )

    const monthName=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]


    // kelvin to celsius change funcation 
    const kelvinToCelsius=()=>  setTamp([(weather.main.temp_min - 273.15).toFixed(2),(weather.main.temp_max - 273.15).toFixed(2)])

    setInterval(()=>kelvinToCelsius(),100)

    // wind direction calulate using deg
    function directionFunc(d) {
        let directions = ['Northerly', 'North Easterly', 'Easterly', 'South Easterly', 'Southerly', 'South Westerly', 'Westerly', 'North Westerly'];
        d += 22.5;
        d < 0 ? d = 360 - Math.abs(d) % 360 : d = d % 360;
        let w = parseInt(d / 45);
        return `${directions[w]}`;
    }

    // opan window
    const Morewether = e=>{
        return (<div className="popup">
                    <div className="window">
                        <span className="cencel" onClick={() => setWindowName('')}>X</span>
                        <div>
                        <div className="location">
                            <h1>{weather.name}</h1><br />
                        </div>
                        <div className="rowDate">
                                <div className="hoursColumn">
                                <div>
                                        <div className="weatherStatus">
                                            <img className="weatherImgStatus" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                                        <h6 className="weatherTextStatus">{weather.weather[0].main}</h6>
                                        </div>
                                        <div className="tamp">temperature</div>
                                        <div className="temperature"><h6>min {tamp[0]}%</h6><h6>max {tamp[1]}%</h6> </div>
                                        <div className="windStatus">
                                            <i class="fas fa-wind"></i>
                                            <h6>{(weather.wind.speed* 1.6).toFixed(2)}km/<span>{directionFunc(weather.wind.deg)}</span></h6>
                                        </div>
                                        <div className="carrentTime">
                                            <h1>{date.getHours().toString().length === 1 ? `0${date.getHours()}` :date.getHours()}:{date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` :date.getMinutes()}</h1><br />
                                            <h4>{date.getDate().toString().length === 1 ? `0${date.getDate()}` :date.getDate()}/<span>{monthName[date.getMonth()]}</span></h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="weatherStatus">
                                            <img className="weatherImgStatus" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                                        <h6 className="weatherTextStatus">{weather.weather[0].main}</h6>
                                        </div>
                                        <div className="tamp">temperature</div>
                                        <div className="temperature"><h6>min {tamp[0]}%</h6><h6>max {tamp[1]}%</h6> </div>
                                        <div className="windStatus">
                                            <i class="fas fa-wind"></i>
                                            <h6>{(weather.wind.speed* 1.6).toFixed(2)}km/<span>{directionFunc(weather.wind.deg)}</span></h6>
                                        </div>
                                        <div className="carrentTime">
                                            <h1>{date.getHours().toString().length === 1 ? `0${date.getHours()}` :date.getHours()}:{date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` :date.getMinutes()}</h1><br />
                                            <h4>{date.getDate().toString().length === 1 ? `0${date.getDate()}` :date.getDate()}/<span>{monthName[date.getMonth()]}</span></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>)
    }
        
    return (
        <>
        <div className="weatherContainer">
            <div className="button" onClick={()=>setWindowName("weather")}>more</div>
            <div className="discription">
                <h5>{weather.weather[0].description}</h5>
            </div>
            <div className="weatherStatus">
            <img className="weatherImgStatus" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <h6 className="weatherTextStatus">{weather.weather[0].main}</h6>
            </div>
            <div className="temperature"><h6>min temp{tamp[0]}%</h6><h6>max temp{tamp[1]}%</h6> </div>
            <div className="humidity"><h5>Humidity</h5><h6>{weather.main.humidity}%</h6> </div>

            <div className="windStatus">
            <i class="fas fa-wind"></i><br />
            <h6>{(weather.wind.speed* 1.6).toFixed(2)}km/<span>{directionFunc(weather.wind.deg)}</span></h6>
            </div>
            <div className="location">
                <h1>{weather.name}</h1><br /><h4>{weather.sys.country}</h4>
            </div>
            <div className="carrentTime">
                <h1>{date.getHours().toString().length === 1 ? `0${date.getHours()}` :date.getHours()}:{date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` :date.getMinutes()}</h1><br />
                <h4>{date.getDate().toString().length === 1 ? `0${date.getDate()}` :date.getDate()}/<span>{monthName[date.getMonth()]}</span></h4>
            </div>
        </div>
        <section className="popupSection"> 
        {windowName==="weather"?Morewether():""}
        </section>
        </>
    )
}

export default WeatherComponent
