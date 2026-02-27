import { print, writeJson } from "../src/infrastructure/io";
import fs from "fs";
import path from "path";

describe('I/O infrastructure', () => {
    const tmpPath = path.join(__dirname, 'tmp.json');
    afterAll(() => {if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath); });

    test('print() ne crash pas', () => {
        expect(() => print('Hello')).not.toThrow();
    });

    test('writeJson() écrit correctement un fichier', () => {
        const data = { a: 1};
        writeJson(tmpPath, data);
        const content = JSON.parse(fs.readFileSync(tmpPath, 'utf-8'));
        expect(content).toEqual(data);
    })
})