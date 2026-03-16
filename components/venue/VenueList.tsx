'use client';

import { formatVenueDeals, filterAndSortVenues } from '@/lib/utils/venueUtils';
import { Venue } from '@/types/venues';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { VenueImage } from './VenueImage';

import { FaMagnifyingGlass } from 'react-icons/fa6';

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
      <div className="border-b border-gray-200 mb-6 sticky top-0 bg-white dark:bg-black z-10">
        <div className="container mx-auto p-4 relative">
          <FaMagnifyingGlass size={20} className="absolute mt-3 ml-3 text-gray-500" />
          <input
            type="search"
            placeholder="e.g. chinese, pizza"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full py-2 pr-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-800"
          />
        </div>
      </div>

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
            {filteredVenues.map(venue => {
              const { name, objectId, imageLink, address1, suburb, cuisines, deals } = venue;
              const dealData = formatVenueDeals(deals);

              return (
                <li
                  key={objectId}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
                >
                  <Link href={`/venues/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`}>
                    <VenueImage src={imageLink} alt={name} className="w-full h-48 object-cover" />
                    {dealData && (
                      <div className="absolute top-4 left-4 bg-(--ec-red) text-white font-bold p-1 px-2 flex flex-col items-start shadow-sm">
                        <p className="text-sm">{dealData.summary}</p>
                        {dealData.timeStipulation && (
                          <p className="text-[10px] leading-tight opacity-90">{dealData.timeStipulation}</p>
                        )}
                      </div>
                    )}
                    <div className="p-4 flex flex-col h-32">
                      <h2 className="text-xl font-bold mb-1 text-black truncate">{name}</h2>
                      <p className="text-gray-600 text-sm mb-2">{`${address1}, ${suburb}`}</p>

                      <p className="text-gray-500 text-xs mt-auto italic">{cuisines.join(' • ')}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default VenueList;
