import axios from "axios"

export const getProducts = (token) => {
    return axios.get('https://galaxia-mart-server.vercel.app/products', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            console.log('error fetching products data', err);
        });
}