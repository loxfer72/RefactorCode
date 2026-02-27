import { run as legacyRun } from "../legacy/orderReportLegacy";

export function generateReport() {
    return legacyRun();
}