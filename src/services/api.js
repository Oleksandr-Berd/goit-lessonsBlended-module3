import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '29768584-66d59ea1e394ad82ebc4cd906';

export const fetchImages = async (query, page) => {
  const {
    data: { hits },
  } = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return hits;
};
