export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateRisk(symptoms: Record<string, boolean>): number {
  const riskFactors = Object.values(symptoms).filter(Boolean).length;
  return (riskFactors / Object.keys(symptoms).length) * 100;
}
