import axios from 'axios';

export async function fetchPictures({ query, currentPage, abortCtrl }) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = {
    key: '35947372-f7304d47210ac11edb1e8f45f',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: currentPage,
  };

  const response = await axios.get(BASE_URL, {
    signal: abortCtrl.signal,
    params: params,
  });

  return response.data;
}
