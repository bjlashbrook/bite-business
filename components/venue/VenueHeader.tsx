import { FaBookOpen, FaMapLocationDot, FaPhone, FaRegHeart } from 'react-icons/fa6';
import { VenueImage } from './VenueImage';

interface VenueHeaderProps {
  imageLink: string;
  name: string;
}

export const VenueHeader: React.FC<VenueHeaderProps> = ({ imageLink, name }) => {
  return (
    <>
      <div className="relative w-full h-80 mb-6 overflow-hidden shadow-md">
        <VenueImage 
          src={imageLink} 
          alt={name} 
          className="w-full h-full object-cover" 
          width={1200}
          height={800}
        />
      </div>

      <div className="p-4 pt-0 border-b pb-4 mb-6 border-gray-200">
        <ul className="container mx-auto flex justify-around items-center gap-4 text-gray-600">
          <li className="flex flex-col items-center gap-1">
            <FaBookOpen size={20} />
            <span className="text-xs">Menu</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <FaPhone size={20} />
            <span className="text-xs">Call</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <FaMapLocationDot size={20} />
            <span className="text-xs">Location</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <FaRegHeart size={20} />
            <span className="text-xs">Favourite</span>
          </li>
        </ul>
      </div>
    </>
  );
};
