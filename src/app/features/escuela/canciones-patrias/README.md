
# Canciones Patrias - Documentación de Arquitectura

## Descripción

Subsección de **Escuela** que permite visualizar, tocar y aprender canciones patrióticas argentinas con múltiples instrumentos.

## Estructura de Archivos

```text
canciones-patrias/
├── patriotic-song.model.ts           # Modelos e interfaces de datos
├── patriotic-songs.service.ts        # Servicio para cargar canciones desde assets
├── canciones-patrias.component.ts    # Componente principal (orquestador)
├── canciones-patrias.component.html  # Template del componente principal
├── canciones-patrias.component.scss  # Estilos del componente principal
├── song-viewer-display.component.ts  # Componente de visualización (pentagrama + acordes)
├── song-viewer-display.component.html
├── song-viewer-display.component.scss
└── README.md                         # Este archivo

```text

## Modelos de Datos

### `PatrioticSong`

```typescript
interface PatrioticSong {
  id: string;                    // Identificador único
  titulo: string;                // Nombre de la canción
  compositor?: string;           // Nombre del compositor
  year?: number;                 // Año de creación
  
  // Configuración musical
  tono: string;                  // Tonalidad (C, G, D, etc.)
  compas: string;                // Compás (4/4, 3/4, 6/8, etc.)
  tempo: number;                 // BPM
  
  // Contenido musical
  melodia: StaffNote[];           // Secuencia de notas
  acordes: MeasureData[];         // Acordes por compás
  
  // Metadatos
  dificultad: 'basica' | 'intermedia' | 'avanzada';
  instrumentos: ('guitarra' | 'piano' | 'flauta')[];
  descripcion?: string;
  midiPrepared?: boolean;  // Para futura integración MIDI
}

```text

### `StaffNote`

```typescript
interface StaffNote {
  name: string;                  // Nota (C4, D4, E4, etc.)
  position: number;              // Posición en pentagrama (0 = línea superior)
  duration: 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth';
  audioNote: string;             // Para reproducción MIDI
}

```text

### `MeasureData`

```typescript
interface MeasureData {
  measureNumber: number;         // Número del compás
  notes: StaffNote[];            // Notas en este compás
  chords: ChordDiagram[];        // Acordes disponibles
  tempo: number;                 // BPM
  timeSignature: string;         // Compás (4/4, etc.)
}

```text

### `ChordDiagram`

```typescript
interface ChordDiagram {
  name: string;                  // Nombre (G, D, Am, etc.)
  tuning: string[];              // Posiciones para guitarra (6 cuerdas)
  bassFret: number;              // Traste base
  description?: string;          // Descripción del acorde
}

```text

## Servicio: `PatriotiSongsService`

### Métodos Principales

#### `getSongsList(): Observable<PatrioticSong[]>`

Obtiene la lista de todas las canciones disponibles desde `index.json`

#### `getSongById(id: string): Observable<PatrioticSong>`

Carga una canción específica. Implementa cacheo automático.

#### `getSongsByDifficulty(difficulty: string): Observable<PatrioticSong[]>`

Filtra canciones por nivel de dificultad.

#### `getSongsByInstrument(instrument: string): Observable<PatrioticSong[]>`

Filtra canciones disponibles para un instrumento específico.

## Componentes

### `CancionesPatriasComponent`

Componente principal que:

- Carga primera la lista de canciones

- Permite seleccionar una canción

- Permite cambiar de instrumento

- Comunica cambios al componente de visualización

**Propiedades principales:**

- `songs: PatrioticSong[]` - Lista de canciones

- `selectedSong: PatrioticSong` - Canción actual

- `selectedInstrument: InstrumentType` - Instrumento seleccionado

### `SongViewerDisplayComponent`

Componente que muestra:

- **Pentagrama**: Notas musicales interactivas (clicables para sonar)

- **Acordes**: Listado de acordes por compás

- **Diagramas de guitarra**: Placeholder para integración futura (usar librería como `chordpro`)

- **Leyenda**: Explicación de símbolos

- **Información MIDI**: Notificación cuando está preparada

**Inputs:**

- `@Input() song: PatrioticSong` - Canción a mostrar

- `@Input() instrument: InstrumentType` - Instrumento seleccionado

## Datos Estáticos (Assets)

### Estructura de Directorios

```text
assets/data/patriotic-songs/
├── index.json                  # Listado de canciones disponibles
├── himno-nacional.json         # Datos de canción 1
├── cancion-folclorica.json     # Datos de canción 2
└── ...

```text

### Formato de `index.json`

Array de objetos con metadatos básicos (sin melodía completa):

```json
[
  {
    "id": "himno-nacional",
    "titulo": "Himno Nacional de Panamá",
    "compositor": "Manuel Encarnación",
    "tono": "E",
    "compas": "4/4",
    "tempo": 100,
    "dificultad": "intermedia",
    "instrumentos": ["guitarra", "piano", "flauta"]
  },
  ...
]

```text

### Formato de Canción Individual

Archivo `{id}.json` con estructura completa:

```json
{
  "id": "himno-nacional",
  "titulo": "Himno Nacional de Panamá",
  "tono": "E",
  "compas": "4/4",
  "tempo": 100,
  "melodia": [
    {
      "name": "E4",
      "position": 8,
      "duration": "quarter",
      "audioNote": "E4"
    },
    ...
  ],
  "acordes": [
    {
      "measureNumber": 0,
      "chords": [
        {
          "name": "Em",
          "tuning": ["0", "2", "2", "0", "1", "0"],
          "bassFret": 0
        }
      ]
    },
    ...
  ]
}

```text

## Cómo Agregar Nuevas Canciones

### Paso 1: Crear archivo de datos

Crear `assets/data/patriotic-songs/{id}.json` con estructura completa.

### Paso 2: Actualizar índice

Agregar entrada a `assets/data/patriotic-songs/index.json`:

```json
{
  "id": "nueva-cancion",
  "titulo": "Título de la Canción",
  "compositor": "Compositor",
  "tono": "G",
  "compas": "4/4",
  "tempo": 100,
  "dificultad": "basica",
  "instrumentos": ["guitarra", "piano"]
}

```text

### Paso 3: Poblar datos musicales

En el archivo individual, incluir:

- Array completo de notas (`melodia`)

- Acordes por compás (`acordes`)

## Futuras Mejoras

- [ ] **Reproducción MIDI**: Usar `Tone.js` o `midi.js`

- [ ] **Diagramas de Acordes**: Integrar librería como `chordpro` o `svguitar`

- [ ] **Editor visual**: Permitir crear canciones con editor de drag-and-drop

- [ ] **Exportación PDF**: Generar partituras imprimibles

- [ ] **Animaciones de acordes**: Mostrar dedos correctos en tiempo real

- [ ] **Metrónomos**: Ayuda de tempo

- [ ] **Grabación**: Grabar y comparar con original

## Notas Técnicas

### Clave de Sol

Las posiciones en el pentagrama se calculan así:

- Position 0 = línea superior (Fa)

- Cada posición = media espacio (lineSpacing / 2)

- Posiciones negativas = notas por encima

- Posiciones > 8 = notas por debajo (requieren ledger lines)

### Caché de Servicios

El servicio mantiene un caché en memoria de canciones cargadas para mejor performance.

```typescript
// Cache automático
const song = await this.songsService.getSongById('himno-nacional').toPromise();
// Llamada posterior usa la versión en caché

```text

### Responsive Design

- Desktop: Layout 2 columnas (sidebar + visualizador)

- Tablet: Stack vertical

- Mobile: Full width con sidebar colapsable

## Testing

Para agregar tests unitarios:

```typescript
// Ejemplo de test para cargar canción
it('debería cargar canción por ID', () => {
  const songId = 'himno-nacional';
  service.getSongById(songId).subscribe(song => {
    expect(song.id).toBe(songId);
    expect(song.melodia.length).toBeGreaterThan(0);
  });
});

```text

## Integración CSS

Los estilos usan validores CSS (_Sass/SCSS_):

- Variables de color: `$primary-color`, `$secondary-color`

- Breakpoints responsive incluidos

- Print styles para exportación a PDF
