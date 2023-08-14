import Axios from "./caller.service";

let getWeather = (id) => {
    return Axios.get('/api/service/weather/'+id)


}

export const weatherService = {
    getWeather,
}