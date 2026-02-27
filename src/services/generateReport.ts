import { Customer } from '../domain/customer';
import { Order } from '../domain/order';
import { Product } from '../domain/product';
import { buildReport } from './reportBuilder';
import { formatReport } from './reportFormatter';
import * as fs from 'fs';
import * as path from 'path';

export function generateReport(
  customers: Customer[],
  orders: Order[],
  products: Record<string, Product>,
  outputPath?: string
): string {
  const reports = customers.map(c => buildReport(c, orders, products));
  const lines: string[] = [];

  for (const r of reports) {
    lines.push(formatReport(r));
  }

  const result = lines.join('\n');

  if (outputPath) {
    fs.writeFileSync(outputPath, result);
  }

  return result;
}