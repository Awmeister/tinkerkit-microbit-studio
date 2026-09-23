export type SensorCategory = 'tinker_kit' | 'microbit_v2';

export type SignalType = 'digital' | 'analog' | 'i2c' | 'internal';

export type ProjectCategory = 'smarthome' | 'security' | 'games' | 'nature' | 'robotics' | 'audio';

export type DifficultyLevel = 'begynder' | 'mellem' | 'avanceret';

export interface Sensor {
  id: string;
  name: string;
  category: SensorCategory;
  shortDesc: string;
  description: string;
  signalType: SignalType;
  pinRecommendation: string;
  color: string;
  icon: string;
  techTip: string;
}

export interface WiringStep {
  component: string;
  pin: string;
  wireColor: string;
  instructions: string;
}

export interface AlgorithmStep {
  stepNumber: number;
  title: string;
  description: string;
  type: 'setup' | 'input' | 'logic' | 'output';
}

export interface CodeExplanation {
  lines: string;
  explanation: string;
}

export interface ProjectExpansion {
  sensorId: string;
  title: string;
  benefit: string;
  hint: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  requiredSensors: string[];
  expansionSensors: ProjectExpansion[];
  mission: {
    problem: string;
    solution: string;
    learningGoals: string[];
  };
  wiring: WiringStep[];
  algorithm: AlgorithmStep[];
  makeCode: {
    blocksDescription: string;
    stepByStep: string[];
    extensionsNeeded: string[];
    shareUrl?: string;
    typescriptCode: string;
  };
  pythonCode: {
    code: string;
    explanations: CodeExplanation[];
  };
  hexFileName: string;
  hexData?: string;
}
