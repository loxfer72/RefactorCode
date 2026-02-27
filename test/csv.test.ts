import { parseCsv } from '../src/parsing/csv';

test('parseCsv découpe correctement un CSV simple', () => {
    const csv = 'id,name\n1,Alice\n2,Bob';
    const result = parseCsv(csv);
    expect(result).toEqual([
        ['id','name'],
        ['1','Alice'],
        ['2','Bob']
    ]);
});

test('parseCSV ignore les lignes vides', () => {
    const csv = 'id,name\n\n1,Alice\n\n2,Bob\n';
    const result = parseCsv(csv);
    expect(result.length).toBe(3);
});