import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VenueHeader } from './VenueHeader';

describe('VenueHeader', () => {
  it('should render the venue image and action icons', () => {
    render(<VenueHeader imageLink="/test.jpg" name="Test Venue" />);
    
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test.jpg');
    expect(screen.getByText(/menu/i)).toBeInTheDocument();
    expect(screen.getByText(/call/i)).toBeInTheDocument();
    expect(screen.getByText(/location/i)).toBeInTheDocument();
    expect(screen.getByText(/favourite/i)).toBeInTheDocument();
  });
});
