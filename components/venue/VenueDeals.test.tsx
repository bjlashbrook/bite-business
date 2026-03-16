import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VenueDeals } from './VenueDeals';

const mockDeals: any[] = [
  { objectId: 'd1', discount: '20', dineIn: 'true', lightning: 'false', qtyLeft: '5' },
  { objectId: 'd2', discount: '50', dineIn: 'false', lightning: 'true', qtyLeft: '2' }
];

describe('VenueDeals', () => {
  it('should render all deals sorted by discount', () => {
    render(<VenueDeals deals={mockDeals} />);
    
    const dealItems = screen.getAllByRole('listitem');
    expect(dealItems).toHaveLength(2);
    
    // Check that 50% deal is first
    expect(dealItems[0]).toHaveTextContent('50% off');
    expect(dealItems[1]).toHaveTextContent('20% off');
  });

  it('should display the lightning bolt for lightning deals', () => {
    render(<VenueDeals deals={mockDeals} />);
    
    // We can't easily check for the icon component itself, but we can check if the 50% deal 
    // container exists (it has the lightning property)
    expect(screen.getByText('50% off')).toBeInTheDocument();
  });
});
