'use client';

import { formatVenueDeals, getBestDiscountValue } from '@/lib/utils/venueUtils';
import { Venue } from '@/types/venues';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { FaMagnifyingGlass } from 'react-icons/fa6';

type VenueListProps = {
  venues: Venue[];
};

const VenueList: React.FC<VenueListProps> = ({ venues = [] }) => {
  const [query, setQuery] = useState('');

  const filteredVenues = [...venues]
    .filter(
      venue =>
        venue.name.toLowerCase().includes(query.toLowerCase()) ||
        venue.cuisines.some(cuisine => cuisine.toLowerCase().includes(query.toLowerCase()))
    )
    .sort((a, b) => getBestDiscountValue(b.deals) - getBestDiscountValue(a.deals));

  return (
    <>
      <div className="border-b border-gray-200 mb-6">
        <div className="container mx-auto p-4">
          <FaMagnifyingGlass size={20} className="absolute mt-3 ml-3 text-gray-500" />
          <input
            type="search"
            placeholder="e.g. chinese, pizze"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full py-2 pr-4 pl-10 focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      <div className="container mx-auto p-4">
        {filteredVenues.length === 0 ? (
          <p className="text-center text-gray-500">No venues found.</p>
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
                    <Image src={imageLink} alt={name} className="w-full h-48 object-cover" width={640} height={480} />
                    {dealData && (
                      <div className="absolute top-4 left-4 bg-(--ec-red) text-white font-bold p-1 px-2 flex flex-col items-start">
                        <p className="text-sm">{dealData.summary}</p>
                        {dealData.timeStipulation && (
                          <p className="text-[10px] leading-tight">{dealData.timeStipulation}</p>
                        )}
                      </div>
                    )}
                    <div className="p-4 flex flex-col h-32">
                      <h2 className="text-xl font-bold mb-1 text-black truncate">{name}</h2>
                      <p className="text-gray-600 text-sm mb-2">{`${address1}, ${suburb}`}</p>

                      <p className="text-gray-500 text-xs mt-auto">{cuisines.join(', ')}</p>
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
