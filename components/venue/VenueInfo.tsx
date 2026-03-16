import { Venue } from '@/types/venues';
import { FaLocationDot, FaRegClock } from 'react-icons/fa6';

interface VenueInfoProps {
  venue: Venue;
}

export const VenueInfo: React.FC<VenueInfoProps> = ({ venue }) => {
  const { name, cuisines, open, close, address1, suburb } = venue;
  
  return (
    <div className="md:w-1/2 xl:w-2/3">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold leading-tight text-black mb-2">{name}</h1>
        <p className="text-sm text-gray-500 mb-4">{cuisines.join(' • ')}</p>
      </div>

      <div className="flex flex-col gap-3 text-gray-700 mb-6 border-t border-gray-200 pt-6 md:border-t-0">
        <div className="flex items-center gap-2">
          <FaRegClock size={16} />
          <span className="text-sm font-medium">
            Hours: {open} - {close}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaLocationDot size={16} />
          <span className="text-sm">
            {address1}, {suburb}
          </span>
        </div>
      </div>
    </div>
  );
};
