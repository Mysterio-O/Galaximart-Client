import axios from "axios"

export const getCategories = () => {
    return axios.get('https://galaxia-mart-server.vercel.app/categories')
        .then(res => res.data)
        .catch(err => console.log('error fetching products data', err));
}