const API_URL_BASE = 'https://picsum.photos/v2/list';
const IMAGES_FETCH_LIMIT = 50;

export const getImages = async (pageNumber) => {
  const started = Date.now();
  
  const url = `${API_URL_BASE}/?page=${pageNumber}&limit=${IMAGES_FETCH_LIMIT}`
  const result = await fetch(url);
  const parsedResult = await result.json();
  console.log('getimages duration', Date.now() - started, 'ms');
  
  return parsedResult;
};
