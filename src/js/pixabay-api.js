import axios from 'axios';

const API_KEY = '55630526-f44120b4f4ecc6b1cd7cfb12b';
const BASE_URL = 'https://pixabay.com/api/';
export function getImagesByQuery(query, page) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query.trim(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data.hits);
  // .catch(error => {
  //   return error.message;
  // });
}
