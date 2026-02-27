import { generateReport } from '../src/orderReport';
import fs from 'fs';
import path from 'path';

test('Golden Master matches legacy output', () => {
    const expected = fs.readFileSync(
        path.join(__dirname, '../legacy/expected/report.txt'),
        'utf-8'
    );

    const actual = generateReport();

    expect(actual).toBe(expected);
})