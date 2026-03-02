
# Guía de Uso: Canciones Patrias

## Para Usuarios 🎵

### Acceder a Canciones Patrias

1. Ve a **Escuela** en el menú principal
2. Busca la sección **Canciones Patrias** (icono 🇦🇷)
3. Selecciona una canción de la lista

### Cómo Usar el Visualizador

- **Haz clic en las notas** para escucharlas

- **Cambia de instrumento** usando los botones: Guitarra / Piano / Flauta Dulce

- **Lee los acordes** mostrados bajo cada compás

- Para guitarra: Los acordes se muestran como diagramas (próxima versión)

---

## Para Desarrolladores 👨‍💻

### Agregar una Nueva Canción Patricia

#### Paso 1: Crear el archivo de datos

Crea un archivo en `src/assets/data/patriotic-songs/{id}.json`:

```json
{
  "id": "mi-cancion",
  "titulo": "Título de mi Canción",
  "compositor": "Mi Nombre",
  "year": 2024,
  "tono": "G",
  "compas": "4/4",
  "tempo": 100,
  "dificultad": "basica",
  "instrumentos": ["guitarra", "piano"],
  "descripcion": "Breve descripción",
  "midiPrepared": false,
  "melodia": [
    {
      "name": "G4",
      "position": 6,
      "duration": "quarter",
      "audioNote": "G4"
    },
    ...
  ],
  "acordes": [
    {
      "measureNumber": 0,
      "timeSignature": "4/4",
      "tempo": 100,
      "notes": [],
      "chords": [
        {
          "name": "G",
          "tuning": ["3", "2", "0", "0", "0", "3"],
          "bassFret": 0,
          "description": "Acorde mayor de Sol"
        }
      ]
    },
    ...
  ]
}

```text

#### Paso 2: Actualizar el índice

Edita `src/assets/data/patriotic-songs/index.json`:

```json
[
  ...
  {
    "id": "mi-cancion",
    "titulo": "Título de mi Canción",
    "compositor": "Mi Nombre",
    "tono": "G",
    "compas": "4/4",
    "tempo": 100,
    "dificultad": "basica",
    "instrumentos": ["guitarra", "piano"],
    "descripcion": "Breve descripción"
  }
]

```text

### Notas Disponibles (Clave de Sol)

Usa estos nombres de nota `name` en el array `melodia`:

```text
C4, D4, E4, F4, G4, A4, B4,
C5, D5, E5, F5, G5, A5, B5

```text

### Posiciones en el Pentagrama

- `position: 0` = Fa (línea superior)

- `position: 2` = Re (línea media)

- `position: 4` = Si (línea)

- Posiciones por debajo requieren `ledger lines`

### Duraciones de Notas

- `"whole"` = Redonda (blanca)

- `"half"` = Blanca

- `"quarter"` = Negra

- `"eighth"` = Corchea

- `"sixteenth"` = Semicorchea

### Acordes de Guitarra (Tuning)

El array `tuning` representa las 6 cuerdas (de agudo a grave):

```text
["cuerda_mi_aguda", "cuerda_si", "cuerda_sol", "cuerda_re", "cuerda_la", "cuerda_mi_grave"]

```text

Valores: `"0"` = cuerda al aire, `"1"` = 1er traste, etc.

Ejemplo - Acorde G:

```json
{
  "name": "G",
  "tuning": ["3", "2", "0", "0", "0", "3"],
  "bassFret": 0
}

```text

### Dificultad

- `"basica"` = Principiantes (acordes simples, melodía corta)

- `"intermedia"` = Intermedio (múltiples acordes, cambios rápidos)

- `"avanzada"` = Avanzado (técnicas especiales, tempo rápido)

### Ejemplo Completo Mínimo

```json
{
  "id": "ejemplo",
  "titulo": "Mi Primera Canción",
  "tono": "C",
  "compas": "4/4",
  "tempo": 80,
  "dificultad": "basica",
  "instrumentos": ["guitarra"],
  "melodia": [
    { "name": "C4", "position": 10, "duration": "quarter", "audioNote": "C4" },
    { "name": "D4", "position": 9, "duration": "quarter", "audioNote": "D4" },
    { "name": "E4", "position": 8, "duration": "half", "audioNote": "E4" }
  ],
  "acordes": [
    {
      "measureNumber": 0,
      "timeSignature": "4/4",
      "tempo": 80,
      "notes": [],
      "chords": [
        { "name": "C", "tuning": ["0", "3", "3", "2", "1", "0"], "bassFret": 0 }
      ]
    }
  ]
}

```text

---

## Estructura del Proyecto

```text
features/escuela/canciones-patrias/
├── patriotic-song.model.ts              # Interfaces TypeScript
├── patriotic-songs.service.ts           # Servicio de datos
├── canciones-patrias.component.ts       # Componente principal
├── canciones-patrias.component.html
├── canciones-patrias.component.scss
├── song-viewer-display.component.ts     # Visualizador (pentagrama)
├── song-viewer-display.component.html
├── song-viewer-display.component.scss
└── README.md

```text

---

## Próximas Mejoras Planificadas

- ✅ Visualización de pentagrama

- ✅ Selección de instrumentos

- ⏳ Reproducción MIDI interactiva

- ⏳ Diagramas de acordes visuales

- ⏳ Metrónomos con BPM

- ⏳ Grabación y comparación con original

- ⏳ Exportación a PDF

---

## Troubleshooting

### La canción no aparece en la lista

- Verificar que existe en `index.json`

- Revisar que el `id` coincida en ambos archivos

- Confirmar que `assets/data/patriotic-songs/{id}.json` existe

### El pentagrama no muestra notas

- Revisar que `position` sea un número válido (-3 a 10)

- Confirmar que `name` está en la lista válida (C4-B5)

### Los acordes no aparecen

- Revisar que `acordes` es un array válido

- Confirmar que `measureNumber` corresponde con la melodía

---

## Recursos Útiles

- [MIDI Note Numbers](https://en.wikipedia.org/wiki/Scientific_pitch_notation)

- [Guitar Tuning](https://en.wikipedia.org/wiki/Standard_tuning)

- [Music Theory Basics](https://www.musictheory.net/)

¡Feliz composición! 🎵
