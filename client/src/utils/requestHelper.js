import axios from 'axios';

// Port specified according to server port
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
axios.defaults.headers['Content-Type'] = 'application/json';

export const getAll = () => axios.get('/hotdog/');

export const getOne = name => axios.get(`/hotdog/${name}`);

export const createOne = body => axios.post('/hotdog/', body);

export const updateOne = ({ id, body }) => axios.put(`/hotdog/${id}`, body);

export const deleteOne = id => axios.delete(`/hotdog/${id}`);
