import { describe, it, expect } from 'vitest';
import { 
  getDiscountValue, 
  getBestDiscountValue, 
  sortDealsByDiscount, 
  filterAndSortVenues,
  formatVenueDeals 
} from './venueUtils';
import { Venue } from '@/types/venues';

const mockVenue = (id: string, name: string, cuisines: string[], discounts: string[]): Venue => ({
  objectId: id,
  name,
  address1: '123 Test St',
  suburb: 'Test Suburb',
  cuisines,
  imageLink: 'http://test.com/image.jpg',
  open: '9:00am',
  close: '5:00pm',
  deals: discounts.map((d, i) => ({
    objectId: `${id}-deal-${i}`,
    discount: d,
    dineIn: 'true',
    lightning: 'false',
    qtyLeft: '10'
  }))
});

describe('venueUtils', () => {
  describe('getDiscountValue', () => {
    it('should parse valid discount strings', () => {
      expect(getDiscountValue({ discount: '50' } as any)).toBe(50);
    });
    it('should return 0 for invalid strings', () => {
      expect(getDiscountValue({ discount: 'abc' } as any)).toBe(0);
    });
  });

  describe('getBestDiscountValue', () => {
    it('should find the highest discount', () => {
      const deals = [{ discount: '20' }, { discount: '50' }, { discount: '30' }] as any;
      expect(getBestDiscountValue(deals)).toBe(50);
    });
  });

  describe('filterAndSortVenues', () => {
    const venues = [
      mockVenue('1', 'Pizza Palace', ['Italian'], ['20']),
      mockVenue('2', 'Burger Barn', ['American'], ['50']),
      mockVenue('3', 'Pasta Place', ['Italian'], ['30']),
    ];

    it('should filter by name', () => {
      const result = filterAndSortVenues(venues, 'Palace');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Pizza Palace');
    });

    it('should filter by cuisine', () => {
      const result = filterAndSortVenues(venues, 'Italian');
      expect(result).toHaveLength(2);
    });

    it('should sort by best discount', () => {
      const result = filterAndSortVenues(venues, '');
      expect(result[0].name).toBe('Burger Barn'); // 50%
      expect(result[1].name).toBe('Pasta Place'); // 30%
      expect(result[2].name).toBe('Pizza Palace'); // 20%
    });
  });

  describe('formatVenueDeals', () => {
    it('should format single deals with time', () => {
      const deals = [{ 
        discount: '30', 
        dineIn: 'true', 
        open: '12pm', 
        close: '2pm' 
      }] as any;
      const result = formatVenueDeals(deals);
      expect(result?.summary).toBe('30% off • Dine in');
      expect(result?.timeStipulation).toBe('Valid 12pm - 2pm');
    });

    it('should use "Up to" for multiple deals', () => {
      const deals = [{ discount: '20' }, { discount: '50' }] as any;
      const result = formatVenueDeals(deals);
      expect(result?.summary).toContain('Up to 50% off');
    });
  });
});
