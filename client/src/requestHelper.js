import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const getTest = () => axios.get('/test')
  .then(res => res)
  .catch(err => err);

export default getTest;
