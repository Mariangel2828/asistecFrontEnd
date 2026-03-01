# Asistec - Frontend

Aplicacion movil para estudiantes del TEC San Carlos. Desarrollada con [Expo](https://expo.dev) y React Native, usando [Expo Router](https://docs.expo.dev/router/introduction) para el enrutamiento basado en archivos.

## Configuracion inicial

### 1) Instalar dependencias

```bash
npm install
```

### 2) Configurar variables de entorno

Crea un archivo `.env` en la raiz de `asistecFrontEnd/`:

```
API_URL_DEV=http://<IP-local-de-tu-maquina>:8000
```

**Importante:** usa la IP local de tu maquina (ej. `192.168.1.114`), no `localhost`. Esto es necesario cuando pruebas con Expo Go en un dispositivo fisico, ya que el dispositivo y la maquina deben estar en la misma red y `localhost` no es accesible desde el telefono.

### 3) Iniciar la app

```bash
npx expo start
```

El servidor de desarrollo corre en el puerto **8081** por defecto.

### 4) Abrir en el dispositivo

La forma principal de probar la app es con **Expo Go** en un dispositivo fisico Android:

1. Instala [Expo Go](https://expo.dev/go) en tu telefono.
2. Asegurate de que el telefono y la computadora esten en la misma red Wi-Fi.
3. Escanea el codigo QR que aparece en la terminal con la camara o desde Expo Go.

Otras opciones disponibles al correr `npx expo start`:

- [Emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Simulador iOS](https://docs.expo.dev/workflow/ios-simulator/)

## Lint y pruebas

```bash
npm run lint    # expo lint
npm test        # jest --watchAll
```

## Estructura del proyecto

```
app/          — Rutas (Expo Router, file-based routing)
features/     — Logica de UI por dominio (auth, chanels, events, home, user)
  <dominio>/
    components/  — Componentes reutilizables
    screens/     — Pantallas completas
    hooks/       — Hooks de datos y formularios
    services/    — Llamadas axios a la API
shared/       — Constantes y utilidades compartidas (incluye instancia axios)
assets/       — Imagenes y fuentes
```

## Recursos

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
