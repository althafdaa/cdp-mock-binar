import axios from 'axios';
import { parseCookies } from 'nookies';

export const useApi = () => {
  const { token }: { [key: string]: string } = parseCookies();
  const instance = axios.create({
    baseURL: 'https://test-binar.herokuapp.com',
    headers: {
      Authorization: token ?? '',
    },
  });

  return { instance };
};
