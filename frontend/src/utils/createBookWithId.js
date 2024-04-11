import { v4 as uuidv4 } from 'uuid';
export const createBookWidthId = (book, source) => {
  // в book предпологаем, что есть title, author
  return {
    ...book,
    source,
    isFavorite: false,
    id: uuidv4(),
  };
};
