import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VenueInfo } from './VenueInfo';
import { Venue } from '@/types/venues';

const mockVenue: Venue = {
  objectId: '1',
  name: 'Test Info Venue',
  address1: '123 Test St',
  suburb: 'Test Suburb',
  cuisines: ['Test Cuisine'],
  imageLink: '/test.jpg',
  open: '10am',
  close: '10pm',
  deals: []
};

describe('VenueInfo', () => {
  it('should render the name, cuisines, hours and address', () => {
    render(<VenueInfo venue={mockVenue} />);
    
    expect(screen.getByText('Test Info Venue')).toBeInTheDocument();
    expect(screen.getByText('Test Cuisine')).toBeInTheDocument();
    expect(screen.getByText(/hours: 10am - 10pm/i)).toBeInTheDocument();
    expect(screen.getByText('123 Test St, Test Suburb')).toBeInTheDocument();
  });
});
