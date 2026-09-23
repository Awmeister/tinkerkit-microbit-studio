import React from 'react';
import {
  Activity,
  Radio,
  RotateCw,
  Monitor,
  Droplets,
  MousePointerClick,
  Keyboard,
  Sliders,
  Volume2,
  Mic,
  Speaker,
  Fingerprint,
  Compass,
  Sun,
  Thermometer,
  ToggleRight,
  Grid,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface SensorIconProps extends LucideProps {
  name: string;
}

export const SensorIcon: React.FC<SensorIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Activity':
      return <Activity {...props} />;
    case 'Radio':
      return <Radio {...props} />;
    case 'RotateCw':
      return <RotateCw {...props} />;
    case 'Monitor':
      return <Monitor {...props} />;
    case 'Droplets':
      return <Droplets {...props} />;
    case 'MousePointerClick':
      return <MousePointerClick {...props} />;
    case 'Keyboard':
      return <Keyboard {...props} />;
    case 'Sliders':
      return <Sliders {...props} />;
    case 'Volume2':
      return <Volume2 {...props} />;
    case 'Mic':
      return <Mic {...props} />;
    case 'Speaker':
      return <Speaker {...props} />;
    case 'Fingerprint':
      return <Fingerprint {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    case 'Sun':
      return <Sun {...props} />;
    case 'Thermometer':
      return <Thermometer {...props} />;
    case 'ToggleRight':
      return <ToggleRight {...props} />;
    case 'Grid':
      return <Grid {...props} />;
    case 'Layers':
      return <Layers {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    default:
      return <Cpu {...props} />;
  }
};
