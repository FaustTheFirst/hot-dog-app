import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

const getTest = () => axios.get('/test')
  .then(res => res)
  .catch(err => err);

export default getTest;
