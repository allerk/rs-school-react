import { LOCAL_STORAGE_KEY } from '../constants/general-constants.ts';

export const SaveSearchTermToLS = (searchTerm: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm);
};

export const GetSearchValuesFromLS = (): string[] => {
  return localStorage.getItem(LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
    : [];
};
