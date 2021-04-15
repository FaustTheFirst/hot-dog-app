import objection from 'objection';
import hotDogRepository from '../../database/repositories/hotDogRepository.js';

const { ValidationError } = objection;

export const getAllHotDogs = async () => {
  const allHotDogs = await hotDogRepository.getAll();

  return allHotDogs;
};

export const getHotDog = async name => {
  const hotDog = await hotDogRepository.getByName(name);
  if (hotDog) throw new ValidationError({ type: 'ValidationError', message: `${name} already exists` });
};

export const addHotDog = async data => {
  const newHotDog = await hotDogRepository.create(data);

  return newHotDog;
};

export const changeHotDog = async (id, data) => {
  const updatedHotDog = await hotDogRepository.updateById(id, data);

  return updatedHotDog;
};

export const removeHotDog = async id => {
  const deletedHotDog = await hotDogRepository.deleteById(id);

  return deletedHotDog;
};
