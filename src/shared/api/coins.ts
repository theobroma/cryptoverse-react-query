import { axiosInstance } from './connection';

export const loadCryptos = async () => {
  const { data } = await axiosInstance.get<any>(`/coins?limit=9`);

  return data;
};
