/* eslint-disable react/destructuring-assignment */
const reg = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

export default {
  name: value => {
    if (typeof value !== 'string') return 'Must be a string';
    if (value.length === 0) return 'Field is required';
    if (value.length < 3 || value.length > 16) return 'Must be more than 3 and less than 16 symbols';
    return null;
  },
  price: value => {
    if (Number.isNaN(+value)) return 'Must be a number';
    if (+value <= 0) return 'Must be greater than zero';
    if (+value > 100) return 'Must be less than 100';
    if (+value !== +Number(value).toFixed(2)) return 'There should be no more than two digits after the decimal point';
    return null;
  },
  imgURL: value => {
    if (value === null) return null;
    if (typeof value !== 'string') return 'Must be a string';
    if (!value.match(reg) && value) return 'Invalid URL format';
    if (value.length > 128) return 'Must be less than 128 symbols';
    return null;
  },
  description: value => {
    if (value === null) return null;
    if (typeof value !== 'string') return 'Must be a string';
    if (value.length > 128) return 'Must be less than 128 symbols';
    return null;
  }
};
