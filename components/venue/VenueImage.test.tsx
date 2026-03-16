import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VenueImage } from './VenueImage';

describe('VenueImage', () => {
  it('should render with the provided src', () => {
    const src = 'http://test.com/valid.jpg';
    render(<VenueImage src={src} alt="Test Venue" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', src);
  });

  it('should switch to fallback if src is invalid/empty', () => {
    render(<VenueImage src="" alt="Test Venue" />);
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toContain('placehold.co');
  });

  it('should switch to fallback on error', () => {
    const src = 'http://test.com/broken.jpg';
    render(<VenueImage src={src} alt="Test Venue" />);
    const img = screen.getByRole('img');
    
    // Trigger error manually
    fireEvent.error(img);
    
    expect(img.getAttribute('src')).toContain('placehold.co');
  });
});
