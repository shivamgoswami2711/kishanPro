import axios from 'axios';

const URL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey= '2af3b76572ec89eebe41fdee001b8aae';
 const fetchData = async (query="480110") => {
    const data = await axios.get(URL,{
        params: {
            zip:query+',in',
            appid:apiKey
        }
    });
    window.localStorage.setItem('weatherData', JSON.stringify(data.data));
    return data.data;
}

export default fetchData;