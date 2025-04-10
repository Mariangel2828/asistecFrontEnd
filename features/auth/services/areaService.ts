import api from '@/shared/constants/api';

export const fetchMajors = async () => {
  const res = await api.get('/api/areas/major');
  return res.data;
};