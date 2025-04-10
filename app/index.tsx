import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 100); // pequeña espera para que el router esté listo

    return () => clearTimeout(timeout);
  }, []);

  return null; // evita pantalla vacía intermedia
}
