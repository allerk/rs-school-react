import axios from 'axios';
import { PaginatedCharacters } from '../interfaces/IApiResponse.ts';

export const GetDataFromApi = async (
  apiUrl: string,
): Promise<PaginatedCharacters> => {
  const config = {
    method: 'get',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios(config);
    return response.data as PaginatedCharacters;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default GetDataFromApi;
