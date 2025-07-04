import { SHIFT_COMBINATIONS, REGISTRATION_FEE } from '@/types/shifts';

export const calculateShiftFee = (selectedShifts: string[]): number => {
  const sortedShifts = selectedShifts.sort().join(',');
  return SHIFT_COMBINATIONS[sortedShifts as keyof typeof SHIFT_COMBINATIONS] || 0;
};

export const calculateTotalAmount = (selectedShifts: string[]): number => {
  const shiftFee = calculateShiftFee(selectedShifts);
  return REGISTRATION_FEE + shiftFee;
};

export const generateSeatNumbers = (): string[] => {
  return Array.from({ length: 50 }, (_, i) => `S${i + 1}`);
};