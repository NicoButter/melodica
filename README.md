# 🎵 Melodica

![Logo](src/assets/images/shared/logo.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-21.0.0-red.svg)](https://angular.io/)
[![Node](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org/)

Una aplicación web interactiva para amantes de la música, diseñada para ayudar en la composición, aprendizaje de acordes e instrumentos musicales. Construida con Angular, Melodica ofrece una experiencia intuitiva y bohemia para crear melodías y explorar el mundo de la música.

## ✨ Características Principales

### 🎼 **Herramientas Creativas**
Accesibles desde la sección principal después del hero:
- **Compositor**: Crea melodías paso a paso con un asistente guiado interactivo
- **Cancionero**: Almacena y organiza tus composiciones
- **Taller Musical**: Aprende y practica con instrumentos interactivos

### 🎸 **Instrumentos Interactivos**
- **Guitarra**: Visualiza acordes y practica técnicas
- **Piano**: Explora notas y acordes en las teclas

### 🎵 **Detección de Notas**
- Usa el micrófono para detectar notas en tiempo real
- Visualiza confianza y precisión de la detección
- Integrado en el paso "Nota Raíz" del compositor

### 🎯 **Selector de Acordes**
- Explora acordes con sugerencias inteligentes
- Visualización en guitarra y piano

### 🎨 **Interfaz Bohemia**
- Diseño elegante con paleta de colores tierra y dorado
- Animaciones suaves y transiciones fluidas
- Completamente responsiva (desktop, tablet, móvil)

### 📚 **Contenido Musical**
- Página "Acerca de" con información del compositor
- Gemas sonoras alojadas en SoundCloud
- Taller y recursos educativos

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/nicobutter/melodica.git
   cd melodica
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Abre tu navegador en `http://localhost:4200/`.

## 📖 Uso

### Servidor de Desarrollo
Para iniciar un servidor local con hot reload:
```bash
npm start
```
o
```bash
ng serve
```
La aplicación se recargará automáticamente al modificar archivos.

### Construcción para Producción
```bash
npm run build
```
o
```bash
ng build
```
Los archivos optimizados se generan en `dist/`.

### Pruebas
- Pruebas unitarias: `npm test`
- Pruebas end-to-end: `npm run e2e`

## 🎼 Detección de Notas con Micrófono

Melodica incluye una funcionalidad avanzada de detección de notas en tiempo real:

**Características:**
- Detección precisa de notas musicales
- Visualización de confianza y precisión
- Integración con el compositor

## 🛠️ Stack Tecnológico

- **Framework**: Angular 21+ (Standalone Components)
- **Lenguaje**: TypeScript
- **Estilos**: SCSS con variables globales
- **Build Tool**: Angular CLI
- **Node.js**: 20+

## 📋 Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Angular CLI 18+

## 🚀 Deployment

La aplicación está optimizada para SSR (Server-Side Rendering) y puede desplegarse en:
- Vercel
- Netlify
- Firebase Hosting
- Cualquier servidor Node.js

**Comandos de build:**
```bash
# Build normal
npm run build

# Build con SSR
npm run build:ssr

# Serve con SSR
npm run serve:ssr
```

## 📸 Captura de Pantalla

![Hero](src/assets/images/hero/background_hero_1.jpg)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios manteniendo la estructura del proyecto
4. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

Asegúrate de:
- Respetar la arquitectura modular del proyecto
- Mantener la consistencia de estilos
- Incluir pruebas unitarias si es posible

## 📚 Documentación Adicional

- [Arquitectura del Proyecto](src/app/ARCHITECTURE.md) - Guía detallada de la estructura
- [Angular Docs](https://angular.io/docs) - Documentación oficial de Angular
- [TypeScript Docs](https://www.typescriptlang.org/docs/) - Documentación de TypeScript

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 💬 Soporte

¿Preguntas o sugerencias? Contacta a:
- **Email**: nicobutter@gmail.com
- **LinkedIn**: [Nicolás Butterfield](https://www.linkedin.com/in/nicolás-butterfield-9964aa1a3/)
- **GitHub**: [@nicobutter](https://github.com/nicobutter)

---

Hecho con ❤️ y 🎵 por Nicolás Butterfield

© 2026 Melodica. Todos los derechos reservados.
