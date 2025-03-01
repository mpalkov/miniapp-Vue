import initConfig from "@/assets/appConfig";

const getImages = async (pageNumber) => {
  const { API_URL_BASE, IMAGES_FETCH_LIMIT } = initConfig;

  const url = `${API_URL_BASE}/?page=${pageNumber}&limit=${IMAGES_FETCH_LIMIT}`
  const result = await fetch(url);
  const parsedResult = await result.json();
  
  return parsedResult;
};

export default getImages;
