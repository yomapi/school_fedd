export function isInEnum(data: string, targetEnum: any): boolean {
  return Object.values(targetEnum).includes(data);
}
