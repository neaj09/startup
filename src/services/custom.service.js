import Axios from "./caller.service";

let getAllContents = () => {
    return Axios.get('/api/content')
}

let getContent = () => {
    return Axios.get('/api/content')
}


let createPost = (formData) => {
    return Axios.post('/api/content', formData, { headers: {'Content-Type': 'multipart/form-data'} })
}


let postContent = (id, formData) => {
    return Axios.patch('/api/content/'+id, formData, { headers: {'Content-Type': 'multipart/form-data'} })
}

let postHero = (id, formData) => {
    return Axios.patch('/api/content/hero/'+id, formData, { headers: {'Content-Type': 'multipart/form-data'}})
}


let deleteContent = (id) => {
    return Axios.delete('/api/content/'+id)
}

let createHero = (formData) => {
    return Axios.post('/api/content/hero', formData, { headers: {'Content-Type': 'multipart/form-data'} })
}

let getHero = () => {
    return Axios.get('/api/content/hero')
}


let getPublicStyle = () => {
    return Axios.get('/api/content/getStyle')
}

let updatePublicStyle = (updatedStyle) => {
    return Axios.patch('/api/content/updateStyle', updatedStyle);
}

export const customService = {
    postContent, getContent, createPost, postHero, getHero, createHero, getPublicStyle, updatePublicStyle
}