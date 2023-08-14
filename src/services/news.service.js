import Axios from "./caller.service";

let getNews = () => {
    return Axios.get('/api/service/news')
}

export const newsService = {
    getNews,
}