// Præcise MakeCode kategorier og farver samplet 1:1 fra det danske MakeCode miljø

export interface MakeCodeCategoryDef {
  name: string;
  color: string;
  isAdvanced: boolean;
  iconName: string;
}

export const MAKECODE_CATEGORIES: Record<string, MakeCodeCategoryDef> = {
  // --- HOVEDKATEGORIER ---
  'Grundlæggende': {
    name: 'Grundlæggende',
    color: '#5891f7',
    isAdvanced: false,
    iconName: 'Grid'
  },
  'Input': {
    name: 'Input',
    color: '#bc38cd',
    isAdvanced: false,
    iconName: 'CircleDot'
  },
  'Musik': {
    name: 'Musik',
    color: '#cb4430',
    isAdvanced: false,
    iconName: 'Headphones'
  },
  'LED': {
    name: 'LED',
    color: '#56358c',
    isAdvanced: false,
    iconName: 'ToggleLeft'
  },
  'Radio': {
    name: 'Radio',
    color: '#c83589',
    isAdvanced: false,
    iconName: 'Signal'
  },
  'Løkker': {
    name: 'Løkker',
    color: '#56a530',
    isAdvanced: false,
    iconName: 'RotateCw'
  },
  'Logik': {
    name: 'Logik',
    color: '#57a1a5',
    isAdvanced: false,
    iconName: 'GitBranch'
  },
  'Variabler': {
    name: 'Variabler',
    color: '#c13541',
    isAdvanced: false,
    iconName: 'Menu'
  },
  'Matematik': {
    name: 'Matematik',
    color: '#852ccb',
    isAdvanced: false,
    iconName: 'Calculator'
  },
  'Tinkercademy': {
    name: 'Tinkercademy',
    color: '#61b73a',
    isAdvanced: false,
    iconName: 'Code'
  },
  'OLED': {
    name: 'OLED',
    color: '#64adb8',
    isAdvanced: false,
    iconName: 'Tv'
  },
  'Sonar': {
    name: 'Sonar',
    color: '#323e4e',
    isAdvanced: false,
    iconName: 'Puzzle'
  },
  'Udvidelser': {
    name: 'Udvidelser',
    color: '#717171',
    isAdvanced: false,
    iconName: 'PlusCircle'
  },

  // --- AVANCERET KATEGORIER ---
  'Funktioner': {
    name: 'Funktioner',
    color: '#475ad3',
    isAdvanced: true,
    iconName: 'FunctionSquare'
  },
  'Matricer': {
    name: 'Matricer',
    color: '#cd6134',
    isAdvanced: true,
    iconName: 'ListOrdered'
  },
  'Tekst': {
    name: 'Tekst',
    color: '#ac872f',
    isAdvanced: true,
    iconName: 'Type'
  },
  'Spil': {
    name: 'Spil',
    color: '#3d774f',
    isAdvanced: true,
    iconName: 'Gamepad2'
  },
  'Billeder': {
    name: 'Billeder',
    color: '#6a21a2',
    isAdvanced: true,
    iconName: 'Image'
  },
  'Pins': {
    name: 'Pins',
    color: '#9d322a',
    isAdvanced: true,
    iconName: 'Disc'
  },
  'Seriel': {
    name: 'Seriel',
    color: '#10214d',
    isAdvanced: true,
    iconName: 'Usb'
  },
  'Kontrol': {
    name: 'Kontrol',
    color: '#333333',
    isAdvanced: true,
    iconName: 'Server'
  }
};

export function getCategoryDef(categoryName: string): MakeCodeCategoryDef {
  // Håndter eventuelle sammensatte navne som "Pins", "Avanceret -> Pins" osv.
  const cleaned = categoryName.replace(/^Avanceret\s*->\s*/i, '').trim();
  return MAKECODE_CATEGORIES[cleaned] || {
    name: cleaned,
    color: '#5891f7',
    isAdvanced: false,
    iconName: 'Square'
  };
}
