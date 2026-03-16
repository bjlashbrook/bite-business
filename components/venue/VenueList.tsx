'use client';

import { filterAndSortVenues } from '@/lib/utils/venueUtils';
import { Venue } from '@/types/venues';
import { useState, useMemo } from 'react';
import { VenueCard } from './VenueCard';
import { VenueSearch } from './VenueSearch';

type VenueListProps = {
  venues: Venue[];
};

const VenueList: React.FC<VenueListProps> = ({ venues = [] }) => {
  const [query, setQuery] = useState('');

  const filteredVenues = useMemo(() => 
    filterAndSortVenues(venues, query), 
    [venues, query]
  );

  return (
    <>
      <VenueSearch query={query} onQueryChange={setQuery} />

      <div className="container mx-auto p-4">
        {filteredVenues.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No venues found for "{query}".</p>
            <button 
              onClick={() => setQuery('')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map(venue => (
              <VenueCard key={venue.objectId} venue={venue} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default VenueList;
