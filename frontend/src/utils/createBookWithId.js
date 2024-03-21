import { v4 as uuidv4 } from 'uuid';
export const createBookWidthId = (book) => {
  // в book предпологаем, что есть title, author
  return {
    ...book,
    isFavorite: false,
    id: uuidv4(),
  };
};
