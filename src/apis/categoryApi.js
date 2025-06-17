import axios from "axios"

export const getCategories = () => {
    return axios.get('http://localhost:3000/categories')
        .then(res => res.data)
        .catch(err => console.log('error fetching products data', err));
}