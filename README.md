# 🎵 Melodica

![Logo](src/assets/images/shared/logo.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-21.0.0-red.svg)](https://angular.io/)

Una aplicación web interactiva para amantes de la música, diseñada para ayudar en la composición, aprendizaje de acordes e instrumentos musicales. Construida con Angular, Melodica ofrece una experiencia intuitiva para crear melodías y explorar el mundo de la música.

## ✨ Características

- **Selector de Acordes**: Explora y selecciona acordes con sugerencias inteligentes.
- **Compositor**: Crea melodías paso a paso con un asistente guiado.
- **Cancionero**: Almacena y organiza tus composiciones.
- **Instrumentos**: Visualiza acordes en guitarra y piano.
- **Detección de Notas**: Usa el micrófono para detectar notas en tiempo real.
- **Interfaz Responsiva**: Diseñada para desktop y móvil.

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/melodica.git
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
Para iniciar un servidor local:
```bash
ng serve
```
La aplicación se recargará automáticamente al modificar archivos.

### Construcción para Producción
```bash
ng build
```
Los archivos se generan en `dist/`.

### Pruebas
- Pruebas unitarias: `ng test`
- Pruebas end-to-end: `ng e2e`

## 🎼 Detección de Notas con Micrófono

Melodica incluye una funcionalidad avanzada de detección de notas en tiempo real:

- Activa el micrófono en el paso "Nota Raíz" del compositor.
- Visualiza la nota detectada y el nivel de confianza.
- Confirma para aplicar la nota a tu composición.

**Notas técnicas:**
- Implementado con Web Audio API y autocorrelación.
- Suavizado EMA para estabilidad.
- Editable en `src/app/services/pitch-detector.service.ts`.

## 📸 Capturas de Pantalla

![Hero](src/assets/images/hero/background_hero_1.jpg)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Fork el proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`).
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Push a la rama (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

Hecho con ❤️ por Nicolás Butterfield
