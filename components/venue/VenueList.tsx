import { formatVenueDeals } from '@/lib/utils/venueUtils';
import { Venue } from '@/types/venues';
import Image from 'next/image';
import Link from 'next/link';

type VenueListProps = {
  venues: Venue[];
};

const VenueList: React.FC<VenueListProps> = ({ venues = [] }) => {
  return (
    <>
      {venues.length === 0 ? (
        <p className="text-center text-gray-500">No venues found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map(venue => {
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
    </>
  );
};

export default VenueList;
