# Guitar Chord Component Documentation

## Overview

The `GuitarChordComponent` is a standalone Angular component that renders visual SVG diagrams of guitar chords following standard guitar notation conventions. It's designed to work offline without external dependencies or third-party libraries.

## Features

- **Accurate Chord Diagrams**: Renders 6-string guitar fretboards with proper positioning
- **Standard Notation**: Follows guitar chord diagram conventions
  - Finger dots centered **between** frets, not on fret lines
  - Muted strings indicated with "✕" above the nut
  - Open strings shown as empty circles above the nut
  - Barre chords displayed as horizontal bars across strings
- **SVG-Based**: Clean, scalable graphics without canvas or image dependencies
- **Customizable**: Compact mode for space-efficient layouts
- **Responsive**: Adapts to different screen sizes
- **Extensible Dataset**: Easy to add new chords

## Rendering Rules

### Critical Positioning
- **Horizontal lines = Frets**: Represent the metal frets on the guitar
- **Vertical lines = Strings**: Represent the 6 guitar strings (E A D G B e)
- **Finger dots**: Positioned **between** frets using formula: `(fretIndex - 0.5) * fretHeight`
- **Indicators**: Muted (✕) and Open (○) markers above the nut

### Visual Hierarchy
- Nut: Thick line (4px) at the top
- Strings: Vertical lines with E strings slightly thicker
- Fret lines: Horizontal lines (1.5px)
- Finger dots: 7px radius circles with gold fill
- Barre chords: Rounded rectangles spanning multiple strings

## Usage

### Basic Implementation

```typescript
import { GuitarChordComponent } from '@shared/components/guitar-chord/guitar-chord.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GuitarChordComponent],
  template: `
    <app-guitar-chord 
      [chordName]="'C'"
      [compact]="false">
    </app-guitar-chord>
  `
})
export class ExampleComponent {}
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `chordName` | `string` | `''` | Name of the chord (e.g., 'C', 'Em', 'D7') |
| `compact` | `boolean` | `false` | Display in compact mode (smaller diagram) |

## Chord Database

### Supported Chords

**Major**: C, D, E, F, G, A, B

**Minor**: Am, Dm, Em, Fm, Gm, Bm

**Seventh**: C7, D7, E7, G7, A7

**Minor Seventh**: Am7, Dm7, Em7

### Adding New Chords

Edit `src/app/shared/data/guitar-chords.ts`:

```typescript
export const GUITAR_CHORDS: Record<string, GuitarChord> = {
  Cmaj7: {
    name: 'Cmaj7',
    positions: [0, 3, 2, 0, 0, 0],  // 6 strings (E A D G B e)
    barre: undefined, // Optional
  }
};
```

### Position Format

- **-1** = Muted string (✕)
- **0** = Open string (○)
- **1-12** = Fret position (numbered)

## Integration in Wizard

The component is integrated in the result step of the composition wizard:

```html
<div class="guitar-diagrams">
  <app-guitar-chord 
    *ngFor="let chord of progression"
    [chordName]="chord"
    [compact]="true">
  </app-guitar-chord>
</div>
```

## Styling

The component uses SCSS with variables from `_variables.scss`:

- **Chord Name**: `#d4af37` (gold)
- **Strings**: `#2c3e50` (dark)
- **Muted**: `#888` (gray)
- **Open**: `#6b8e23` (olive)
- **Dots**: `#d4af37` (gold)

### Compact Mode

```scss
app-guitar-chord[compact="true"] {
  // Automatically applies smaller styles
}
```

## Placeholder for Unknown Chords

If a chord name is not found in the database, the component displays a placeholder:

- Shows the chord name as provided
- Renders all open strings
- Doesn't break the UI
- Useful for extensibility

## Performance

- Pure SVG rendering (no canvas overhead)
- No external API calls
- Lightweight component (~5KB unminified)
- Responsive design without media queries complexity

## Future Enhancements

- Piano chord diagrams
- Alternative chord voicings
- Finger numbering suggestions
- Chord transposition
- Barre chord alternatives

## File Structure

```
src/app/shared/
├── data/
│   └── guitar-chords.ts       # Chord database
└── components/
    └── guitar-chord/
        ├── guitar-chord.component.ts      # Component logic
        ├── guitar-chord.component.html    # SVG template
        └── guitar-chord.component.scss    # Styling
```

## Example Output

```
     C
    ---
    |O|
    |X|
    |X|
    ---
    [•] [•] [•]
```

Where:
- O = Open string
- X = Muted string
- [•] = Fretted note
