import { Venue } from '@/types/venues';
import { sortDealsByDiscount } from '@/lib/utils/venueUtils';
import { FaBolt } from 'react-icons/fa6';

interface VenueDealsProps {
  deals: Venue['deals'];
}

export const VenueDeals: React.FC<VenueDealsProps> = ({ deals }) => {
  const sortedDeals = sortDealsByDiscount(deals);

  return (
    <ul className="space-y-2 mb-8 md:w-1/2 xl:w-1/3">
      {sortedDeals.map(deal => (
        <li
          key={deal.objectId}
          className="flex gap-4 justify-between border-t border-gray-200 pt-4 md:first:border-t-0"
        >
          <div>
            <h2 className="flex items-center text-(--ec-red) text-2xl">
              {deal.lightning === 'true' && <FaBolt className="text-yellow-500 me-1" size={20} />}
              <span className="font-bold">
                {deal.discount}% off {deal.dineIn === 'true' && ' • Dine In'}
              </span>
            </h2>
            {(deal.open || deal.start) && (deal.close || deal.end) && (
              <p className="text-sm text-gray-500">
                Between {deal.open || deal.start} and {deal.close || deal.end}
              </p>
            )}
            <p className="text-sm text-gray-400">{deal.qtyLeft} Deals left</p>
          </div>
          <button className="text-(--ec-red) border-2 border-(--ec-red) px-4 py-2 rounded-full font-bold hover:bg-(--ec-red) hover:text-white transition-colors my-auto">
            Redeem
          </button>
        </li>
      ))}
    </ul>
  );
};
