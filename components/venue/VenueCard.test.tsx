import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VenueCard } from './VenueCard';
import { Venue } from '@/types/venues';

const mockVenue: Venue = {
  objectId: '1',
  name: 'Pizza Palace',
  address1: '123 Test St',
  suburb: 'Suburbia',
  cuisines: ['Italian', 'Pizza'],
  imageLink: '/pizza.jpg',
  open: '11am',
  close: '11pm',
  deals: [
    { 
      objectId: 'd1', 
      discount: '50', 
      dineIn: 'true', 
      lightning: 'false', 
      qtyLeft: '10' 
    }
  ]
};

describe('VenueCard', () => {
  it('should render the venue details correctly', () => {
    render(<VenueCard venue={mockVenue} />);
    
    expect(screen.getByText('Pizza Palace')).toBeInTheDocument();
    expect(screen.getByText('123 Test St, Suburbia')).toBeInTheDocument();
    expect(screen.getByText('Italian • Pizza')).toBeInTheDocument();
  });

  it('should display the formatted deal summary', () => {
    render(<VenueCard venue={mockVenue} />);
    
    expect(screen.getByText('50% off • Dine in')).toBeInTheDocument();
  });

  it('should link to the correct venue detail page', () => {
    render(<VenueCard venue={mockVenue} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/venues/pizza-palace');
  });
});
