import axios from 'axios';

const API_KEY = '55630526-f44120b4f4ecc6b1cd7cfb12b';
const BASE_URL = 'https://pixabay.com/api/';
export async function getImagesByQuery(query, page) {
  const response = await axios(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });
  return response.data;
}
