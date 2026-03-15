import { Venue } from '@/types/venues';

export interface FormattedDeals {
  summary: string;
  timeStipulation?: string;
}

/**
 * Safely parses the discount string into a number.
 */
export const getDiscountValue = (deal: Venue['deals'][number]): number => {
  return parseInt(deal.discount, 10) || 0;
};

/**
 * Returns the highest discount value from a list of deals.
 */
export const getBestDiscountValue = (deals: Venue['deals']): number => {
  if (!deals || deals.length === 0) return 0;
  return Math.max(...deals.map(getDiscountValue));
};

/**
 * Sorts deals by discount percentage in descending order.
 */
export const sortDealsByDiscount = (deals: Venue['deals']): Venue['deals'] => {
  return [...deals].sort((a, b) => getDiscountValue(b) - getDiscountValue(a));
};

export function formatVenueDeals(deals: Venue['deals']): FormattedDeals | null {
  if (!deals || deals.length === 0) return null;

  const sortedDeals = sortDealsByDiscount(deals);
  const bestDeal = sortedDeals[0];
  const isMultiple = deals.length > 1;

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
