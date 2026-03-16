import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VenueSearch } from './VenueSearch';

describe('VenueSearch', () => {
  it('should render the input with the correct value', () => {
    render(<VenueSearch query="test query" onQueryChange={() => {}} />);
    const input = screen.getByPlaceholderText(/e\.g\. chinese, pizza/i);
    expect(input).toHaveValue('test query');
  });

  it('should call onQueryChange when typing', () => {
    const onQueryChange = vi.fn();
    render(<VenueSearch query="" onQueryChange={onQueryChange} />);
    const input = screen.getByPlaceholderText(/e\.g\. chinese, pizza/i);
    
    fireEvent.change(input, { target: { value: 'new query' } });
    expect(onQueryChange).toHaveBeenCalledWith('new query');
  });
});
