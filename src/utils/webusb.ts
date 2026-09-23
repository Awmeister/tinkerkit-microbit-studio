// WebUSB hjælpefunktioner til BBC micro:bit v2

// Type definitioner til WebUSB så det kompilerer uden eksterne polyfills
interface USBDevice {
  productName?: string;
  vendorId?: number;
  productId?: number;
  open(): Promise<void>;
  close(): Promise<void>;
  selectConfiguration(configurationValue: number): Promise<void>;
  claimInterface(interfaceNumber: number): Promise<void>;
}

export interface WebUSBStatus {
  supported: boolean;
  connected: boolean;
  deviceName?: string;
  progress?: number;
  statusText?: string;
  error?: string;
}

// Vendor ID for BBC micro:bit (DAPLink)
export const MICROBIT_VENDOR_ID = 0x0d28;
export const MICROBIT_PRODUCT_ID_V2 = 0x0204;

export const isWebUSBSupported = (): boolean => {
  return typeof navigator !== 'undefined' && 'usb' in navigator;
};

export async function requestMicrobitDevice(): Promise<USBDevice | null> {
  if (!isWebUSBSupported()) {
    throw new Error('WebUSB understøttes desværre ikke i denne browser. Brug Google Chrome, Microsoft Edge eller Opera.');
  }

  try {
    const nav = navigator as any;
    const device: USBDevice = await nav.usb.requestDevice({
      filters: [{ vendorId: MICROBIT_VENDOR_ID }]
    });
    return device;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'NotFoundError') {
      return null; // Brugeren lukkede dialogen uden at vælge
    }
    throw err;
  }
}

/**
 * Download en .hex fil direkte i browseren
 */
export function downloadHexFile(filename: string, hexContent?: string) {
  // Gyldig Intel HEX skabelon til micro:bit
  const defaultHex = hexContent || `:020000040000FA\n:1000000000040020ED010000B9010000BB010000E0\n:00000001FF\n`;
  
  const blob = new Blob([defaultHex], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.hex') ? filename : `${filename}.hex`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Kopier MakeCode TypeScript til udklipsholder og åbn MakeCode
 */
export async function openInMakeCode(typescriptCode: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(typescriptCode);
    window.open('https://makecode.microbit.org/#editor', '_blank');
    return true;
  } catch (err) {
    console.error('Kunne ikke kopiere til udklipsholder:', err);
    window.open('https://makecode.microbit.org/#editor', '_blank');
    return false;
  }
}
