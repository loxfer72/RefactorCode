import { run } from "../legacy/orderReportLegacy";
import fs from "fs";
import path from "path";

function captureStdout(fn:() => string){
    const originalLog = console.log;
    let output = '';

    console.log = (...args: unknown[]) => {
        output =+ args.join(' ') + '\n';
    };

    try {
        const result = fn();
        return { stdout: output.trim(), result };
    } finally {
        console.log = originalLog;
    }
}

test('generate golden Master', () => {
    const { result } = captureStdout(() => run());

    const expectedPath = path.join(__dirname, '../legacy/expected/report.txt');

    fs.writeFileSync(expectedPath, result);
})