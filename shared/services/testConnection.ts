import api from '../constants/api';

export const testApiConnection = async () => {
  try {
    const response = await api.get('/'); 
    console.log('✅ API respondió correctamente:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error conectando con la API:', error.message);
    return null;
  }
};