# Arquitectura de la Aplicación Melodica

## 📁 Estructura de Directorios

```
src/app/
├── core/                      # Módulo Core - Singleton
│   ├── layout/               # Componentes de layout (usados una vez)
│   │   ├── header/          # Header principal de la app
│   │   └── footer/          # Footer principal de la app
│   └── services/            # Servicios globales singleton
│       ├── config.service.ts
│       └── pitch-detector.service.ts
│
├── shared/                   # Módulo Shared - Reutilizable
│   ├── components/          # Componentes reutilizables
│   │   ├── button/         # Botón genérico
│   │   └── mic-capture/    # Captura de micrófono
│   ├── animations/         # Animaciones reutilizables
│   └── styles/            # Estilos y variables globales
│
└── features/               # Módulos de características
    ├── about/             # Página "Acerca de"
    ├── acorde/            # Feature de acordes (selector, sugerencia, service)
    ├── composer/          # Feature de composición musical
    │   ├── steps/        # Pasos del proceso de composición
    │   └── services/     # Servicios específicos del compositor
    ├── herramientas/      # Sección de herramientas creativas
    ├── hero/              # Hero section (landing)
    ├── instrumento/       # Feature de instrumentos (guitarra, piano)
    ├── landing/           # Página principal (home)
    ├── songbook/          # Feature de cancionero
    └── taller/            # Feature de taller/workshop
```

## 🎯 Convenciones

### Core (`core/`)
- **Propósito**: Servicios y componentes singleton que se usan UNA sola vez en toda la app
- **Contenido**:
  - `layout/`: Header, Footer, Sidebar (componentes de estructura)
  - `services/`: Servicios globales (configuración, autenticación, etc.)
  - `guards/`: Guards de routing (cuando sea necesario)
  - `interceptors/`: HTTP interceptors (cuando sea necesario)
- **Regla**: Solo se importa en AppComponent o en el nivel raíz

### Shared (`shared/`)
- **Propósito**: Componentes, directivas y pipes REUTILIZABLES en múltiples features
- **Contenido**:
  - `components/`: Componentes genéricos (buttons, modals, cards)
  - `directives/`: Directivas personalizadas
  - `pipes/`: Pipes personalizados
  - `animations/`: Animaciones reutilizables
  - `styles/`: Variables y mixins SCSS
- **Regla**: Se puede importar desde cualquier feature

### Features (`features/`)
- **Propósito**: Módulos de características específicas de la aplicación
- **Contenido**: Cada feature puede tener:
  - Componentes (pages y components internos)
  - Servicios específicos del feature
  - Modelos/interfaces del feature
  - Sub-features o steps
- **Regla**: Un feature NO debe importar de otro feature directamente
  - Si necesitan compartir código → mover a `shared/`
  - Si es un servicio global → mover a `core/services/`

## 📋 Estructura de un Feature Típico

```
features/composer/
├── composer.page.ts         # Componente principal (página)
├── composer.page.html
├── composer.page.scss
├── steps/                   # Sub-componentes específicos
│   ├── root-step/
│   ├── mood-step/
│   └── harmony-step/
└── services/               # Servicios específicos del feature
    └── composer.service.ts
```

## 🚫 Anti-patrones a Evitar

1. ❌ No crear componentes en `core/` que se usen múltiples veces
2. ❌ No importar features entre sí directamente
3. ❌ No colocar servicios en la raíz de `app/` (usar `core/services/`)
4. ❌ No duplicar header/footer en múltiples ubicaciones
5. ❌ No mezclar componentes de página con componentes reutilizables

## ✅ Buenas Prácticas

1. ✅ Usar `standalone: true` en todos los componentes
2. ✅ Servicios globales en `core/services/` con `providedIn: 'root'`
3. ✅ Componentes reutilizables en `shared/components/`
4. ✅ Features independientes y auto-contenidos
5. ✅ Lazy loading para features grandes (cuando sea necesario)

## 🔄 Flujo de Dependencias

```
App Root
   ↓
  Core (layout + services globales)
   ↓
Features ← Shared (componentes reutilizables)
```

**Regla de oro**: Las dependencias siempre van de abajo hacia arriba, nunca al revés.
