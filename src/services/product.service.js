import Axios from "./caller.service";


// Catégories

let getAllCategories = () => {
    return Axios.get('/api/products/categories')
}
let createCategory = (formData) => {
    return Axios.post('/api/products/categories', formData);
}
let updateCategory = (id, formData) => {
    return Axios.put('/api/products/categories/'+id, formData);
}
let deleteCategory = (id) => {
    return Axios.delete('/api/products/categories/'+id);
}

// Options
let createOption = (formData) => {
    return Axios.post('/api/products/options', formData);
}
let deleteOption = (id) => {
    return Axios.delete('/api/products/options/'+id);
}
let updateOptionsOrder = (id, formData) => {
    return Axios.put('/api/products/options/'+id+'/options-order', formData);
}



// products
let getAllProducts = () => {
    return Axios.get('/api/products')
}

let getProduct = (id) => {
    return Axios.get('/api/products/'+id)
}

let updateProduct = (id, formData) => {
    return Axios.patch('/api/products/'+id, formData, { headers: {'Content-Type': 'multipart/form-data'}})
}

let createProduct = (formData) => {
    return Axios.post('/api/products/', formData, { headers: {'Content-Type': 'multipart/form-data'} })
}

let uploadImg = (formData) => {
    Axios.post('/api/products', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
}

let deleteProduct = (id) => {
    return Axios.delete('/api/products/'+id)
}



export const productService = {
    // Produits
    deleteProduct,
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    uploadImg,
    
    // Catégories
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,

    // Options
    createOption,
    deleteOption,
    updateOptionsOrder
}
