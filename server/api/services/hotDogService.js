import hotDogRepository from '../../database/repositories/hotDogRepository.js';

export const getAllHotDogs = async () => {
  const allHotDogs = await hotDogRepository.getAll();

  return allHotDogs;
};

export const getHotDog = async id => {
  const hotDog = await hotDogRepository.getById(id);

  return hotDog;
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
