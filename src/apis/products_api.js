import axios from "axios"

export const getCategories = () => {
    return axios.get('/product_categories.json')
    .then(res => console.log(res.data))
    .catch(err => console.log('error fetching products data', err));
}