import { Report } from '../domain/report';

/**
 * Transforme un Report en sortie texte identique au legacy
 */
export function formatReport(report: Report): string {
  const lines: string[] = [];

  lines.push(`Customer: ${report.name} (${report.customerId})`);
  lines.push(`Subtotal: ${report.subtotal.toFixed(2)}`);
  lines.push(`Discount: ${report.totalDiscount.toFixed(2)}`);
  lines.push(`  - Volume discount: ${report.volumeDiscount.toFixed(2)}`);
  lines.push(`  - Loyalty discount: ${report.loyaltyDiscount.toFixed(2)}`);
  if (report.morningBonus > 0) {
    lines.push(`  - Morning bonus: ${report.morningBonus.toFixed(2)}`);
  }
  lines.push(`Tax: ${report.tax.toFixed(2)}`);
  lines.push(`Shipping: ${report.shipping.toFixed(2)}`);
  lines.push(`Handling: ${report.handling.toFixed(2)}`);
  lines.push(`Total: ${report.total.toFixed(2)}`);
  lines.push(`Loyalty Points: ${Math.floor(report.loyaltyPoints)}`);
  lines.push('');
  return lines.join('\n');
}