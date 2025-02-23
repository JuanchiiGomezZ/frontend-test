# Image Gallery App

## 🚀 Descripción

Aplicación web (SPA) desarrollada en React que permite visualizar y gestionar una galería de imágenes con funcionalidades de scroll infinito, búsqueda y sistema de likes.

## ⚡ Características principales

- Scroll infinito para visualización de imágenes
- Búsqueda de imágenes por título
- Sistema de like/unlike para imágenes
- Diseño responsive y accesible
- Integración con GraphQL API

## 🛠️ Tecnologías

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Apollo GraphQL
- Testing Library

## 📁 Estructura del proyecto

```
src/
  ├── components/
  │   ├── common/        # Componentes compartidos
  │   └── ui/            # Componentes base
  ├── features/          # Características principales
  │   └── gallery/
  ├── graphql/           # Queries y mutations
  ├── hooks/             # Custom hooks
  ├── types/             # Types globales
  └── utils/             # Utilidades
```

## 🚦 Comenzando

### Prerrequisitos

- Node.js (v18 o superior)
- yarn

### Variables de Entorno

El proyecto utiliza las siguientes variables de entorno:

```env
VITE_API_URL=https://sandbox-api-test.samyroad.com/graphql
```

1. Copia el archivo `.env.example` a `.env`

```bash
cp .env.example .env
```

2. Ajusta las variables según tu entorno

### Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/JuanchiiGomezZ/frontend-test
```

2. Instalar dependencias

```bash
yarn install
```

3. Iniciar el servidor de desarrollo

```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📝 Scripts disponibles

- `yarn dev` - Inicia el servidor de desarrollo
- `yarn build` - Genera la build de producción
- `yarn test` - Ejecuta los tests
- `yarn lint` - Ejecuta el linter
- `yarn format` - Formatea el código

## 🧪 Testing

El proyecto incluye tests unitarios y de integración utilizando:

- Jest
- React Testing Library
- MSW para el mock de peticiones GraphQL

Para ejecutar los tests:

```bash
yarn test
```

## 📚 API GraphQL

La aplicación se conecta a la API GraphQL disponible en:

```
https://sandbox-api-test.samyroad.com/graphql
```

### Principales operaciones:

- Query `images`: Obtiene el listado de imágenes con soporte para paginación
- Mutation `likeImage`: Gestiona el like/unlike de una imagen

## 🎨 UI/UX

El diseño de la aplicación sigue las especificaciones proporcionadas en Figma, priorizando:

- Accesibilidad
- Responsive design
- Experiencia de usuario fluida
- Consistencia visual
