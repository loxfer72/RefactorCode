import fs from 'fs';

export function print(text: string) {
  console.log(text);
}

export function writeJson(path: string, data: unknown) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
