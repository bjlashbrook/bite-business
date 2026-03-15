import { Venue } from '@/types/venues';

export interface FormattedDeals {
  summary: string;
  timeStipulation?: string;
}

export function formatVenueDeals(deals: Venue['deals']): FormattedDeals | null {
  if (!deals || deals.length === 0) return null;

  const isMultiple = deals.length > 1;

  // Find the deal with the highest discount
  const bestDeal = [...deals].sort((a, b) => {
    const discountA = parseInt(a.discount, 10) || 0;
    const discountB = parseInt(b.discount, 10) || 0;
    return discountB - discountA;
  })[0];

  const summaryParts: string[] = [];

  // 1. Discount part
  summaryParts.push(`${isMultiple ? 'Up to ' : ''}${bestDeal.discount}% off`);

  // 2. Dine In part
  if (bestDeal.dineIn === 'true') {
    summaryParts.push('Dine in');
  }

  // 3. Time part (only if it's a single deal)
  let timeStipulation: string | undefined;
  if (!isMultiple) {
    const startTime = bestDeal.start || bestDeal.open;
    const endTime = bestDeal.end || bestDeal.close;
    if (startTime && endTime) {
      timeStipulation = `Valid ${startTime} - ${endTime}`;
    }
  }

  return {
    summary: summaryParts.join(' • '),
    timeStipulation
  };
}
