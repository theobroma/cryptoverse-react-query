import { CoinsResponseType } from '@/types';

import { axiosInstance } from './connection';

export const loadCryptos = async () => {
  const { data } = await axiosInstance.get<CoinsResponseType>(`/coins?limit=9`);

  return data.data;
};
