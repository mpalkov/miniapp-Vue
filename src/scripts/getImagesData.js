import initConfig from "@/appConfig";

/** 
 * Fetches data from the images API_URL 
 * @param {number} pageNumber - Must be an integer
 * @returns {
 *  [{
 *    id: string,
 *    author: string,
 *    width: number,
 *    height: number,
 *    url: string,
 *    download_url: string
 *  }]} parsedResult
 */
const getImagesData = async (pageNumber) => {
  const { API_URL_BASE, IMAGES_FETCH_LIMIT } = initConfig;

  try {
    const url = `${API_URL_BASE}/?page=${pageNumber}&limit=${IMAGES_FETCH_LIMIT}`
    const result = await fetch(url);
    const parsedResult = await result.json();
    return parsedResult;
  } catch (error) {
    console.error("Error fetching images data from the API URL: ", error)
    throw error;
  }
};

export default getImagesData;
