import { formatVenueDeals } from '@/lib/utils/venueUtils';
import { Venue } from '@/types/venues';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa6';
import { VenueImage } from './VenueImage';

interface VenueCardProps {
  venue: Venue;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const { name, imageLink, address1, suburb, cuisines, deals } = venue;
  const dealData = formatVenueDeals(deals);
  const slug = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));

  return (
    <li className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative list-none">
      <Link href={`/venues/${slug}`}>
        <VenueImage src={imageLink} alt={name} className="w-full h-48 object-cover" width={600} height={400} />

        {dealData && (
          <div className="absolute top-4 left-4 bg-(--ec-red) text-white font-bold p-1 px-2 flex flex-col items-start shadow-sm">
            <p className="text-sm">{dealData.summary}</p>
            {dealData.timeStipulation && (
              <p className="text-[10px] leading-tight opacity-90">{dealData.timeStipulation}</p>
            )}
          </div>
        )}

        <div className="p-4 flex flex-col h-32">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold mb-1 text-black">{name}</h2>
              <p className="text-gray-600 text-sm mb-2">{`${address1}, ${suburb}`}</p>
            </div>

            <button>
              <FaRegHeart size={20} className="ml-auto text-gray-400 hover:text-(--ec-red) transition-colors" />
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-auto italic">{cuisines.join(' • ')}</p>
        </div>
      </Link>
    </li>
  );
};
