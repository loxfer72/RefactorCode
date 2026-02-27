export function parseCsv(content: string): string[][] {
  return content
    .split('\n')
    .filter((l) => l.trim())
    .map((line) => line.split(','));
}
