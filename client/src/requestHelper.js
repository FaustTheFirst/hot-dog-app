import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
axios.defaults.headers['Content-Type'] = 'application/json';

export const getAll = () => axios.get('/hotdog/');

export const getOne = id => axios.get(`/hotdog/${id}`);

export const createOne = body => axios.post('/hotdog/', body);

export const updateOne = ({ id, body }) => axios.put(`/hotdog/${id}`, body);

export const deleteOne = id => axios.delete(`/hotdog/${id}`);
