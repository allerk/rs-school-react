import axios from 'axios';
import { IApiResponse } from '../interfaces/IApiResponse.ts';

export const GetDataFromApi = async (
  apiUrl: string,
): Promise<IApiResponse[]> => {
  const config = {
    method: 'get',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios(config);
    return response.data.results as IApiResponse[];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default GetDataFromApi;
