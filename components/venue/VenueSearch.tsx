import { FaMagnifyingGlass } from 'react-icons/fa6';

interface VenueSearchProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export const VenueSearch: React.FC<VenueSearchProps> = ({ query, onQueryChange }) => {
  return (
    <div className="border-b border-gray-200 mb-6 sticky top-0 bg-white z-10 shadow-sm">
      <div className="container mx-auto p-4 relative">
        <FaMagnifyingGlass size={20} className="absolute mt-3 ml-3 text-gray-500" />
        <input
          type="search"
          placeholder="e.g. chinese, pizza"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full py-2 pr-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
