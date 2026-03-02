/**
 * Modelo para Canciones Patrias
 * Define la estructura de una canción patriótica con datos musicales
 */

export interface ChordPosition {
  chord: string;
  position: number; // Posición en caracteres en la línea de letra
}

export interface LyricLine {
  line: string;
  chords: ChordPosition[];
}

export interface StaffNote {
  name?: string;        // Nombre de la nota: C4, D4, E4, etc.
  note?: string;        // Nombre de la nota nuevo formato
  midi?: number;        // MIDI number
  position?: number;    // Posición en el pentagrama
  duration: 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth';
  audioNote?: string;   // Para reproducción MIDI futuro
  measure?: number;
}

export interface ChordDiagram {
  name: string;        // Nombre del acorde: G, D, Am, etc.
  tuning?: string[];   // Digitación de la guitarra (6 cuerdas)
  quality?: string;    // major, minor, etc.
  intervalos?: string[]; // Intervalos del acorde
  guitarra?: string[]; // Digitación de guitarra
  bassFret?: number;   // Posición del bajo
  description?: string;
}

export interface MeasureData {
  measureNumber?: number;
  measure?: number;
  notes?: StaffNote[];
  chords?: ChordDiagram[];
  tempo?: number;
  timeSignature?: string; // ej: "4/4", "3/4"
  chord?: ChordDiagram;
}

export interface PatrioticSong {
  id: string;
  titulo: string;
  compositor?: string | { musica?: string; letra?: string };
  year?: number;
  
  // Configuración musical
  tono: string;         // Tonalidad: G, D, C, etc.
  modo?: string;        // major, minor
  compas: string;       // Compás: "4/4", "3/4", "6/8", etc.
  tempo: number;        // BPM
  
  // Contenido musical
  melodia: StaffNote[];           // Secuencia completa de notas
  acordes: MeasureData[];          // Datos por compás
  lyricWithChords?: LyricLine[];   // Letra con acordes superpuestos
  
  // Metadatos
  dificultad: 'basica' | 'intermedia' | 'avanzada';
  instrumentos: Array<'guitarra' | 'piano' | 'flauta'>; // Instrumentos disponibles
  descripcion?: string;
  metadata?: any;
  
  // MIDI preparado para implementación futura
  midiPrepared?: boolean;  // Flag para indicar si hay datos MIDI listos
}

/**
 * Tipos de instrumento soportados
 */
export type InstrumentType = 'guitarra' | 'piano' | 'flauta';

/**
 * Configuración para cada instrumento
 */
export interface InstrumentConfig {
  type: InstrumentType;
  displayName: string;
  icon: string;
  transposition?: number; // Transposición necesaria para el instrumento
}
