import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VenueList from './VenueList';
import { Venue } from '@/types/venues';

const mockVenues: Venue[] = [
  {
    objectId: '1',
    name: 'Pizza Palace',
    address1: '123 St',
    suburb: 'Suburb',
    cuisines: ['Italian'],
    imageLink: '/pizza.jpg',
    open: '11am',
    close: '10pm',
    deals: [{ objectId: 'd1', discount: '20', dineIn: 'true', lightning: 'false', qtyLeft: '5' }]
  },
  {
    objectId: '2',
    name: 'Burger Barn',
    address1: '456 St',
    suburb: 'Suburb',
    cuisines: ['American'],
    imageLink: '/burger.jpg',
    open: '11am',
    close: '10pm',
    deals: [{ objectId: 'd2', discount: '50', dineIn: 'true', lightning: 'false', qtyLeft: '5' }]
  }
];

describe('VenueList', () => {
  it('should render all venues initially', () => {
    render(<VenueList venues={mockVenues} />);
    expect(screen.getByText('Pizza Palace')).toBeInTheDocument();
    expect(screen.getByText('Burger Barn')).toBeInTheDocument();
  });

  it('should filter venues based on search query', () => {
    render(<VenueList venues={mockVenues} />);
    const searchInput = screen.getByPlaceholderText(/e\.g\. chinese, pizza/i);
    
    fireEvent.change(searchInput, { target: { value: 'Pizza' } });
    
    expect(screen.getByText('Pizza Palace')).toBeInTheDocument();
    expect(screen.queryByText('Burger Barn')).not.toBeInTheDocument();
  });

  it('should show empty state and allow clearing', () => {
    render(<VenueList venues={mockVenues} />);
    const searchInput = screen.getByPlaceholderText(/e\.g\. chinese, pizza/i);
    
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
    
    expect(screen.getByText(/no venues found/i)).toBeInTheDocument();
    
    const clearButton = screen.getByText(/clear search/i);
    fireEvent.click(clearButton);
    
    expect(screen.getByText('Pizza Palace')).toBeInTheDocument();
  });
});
