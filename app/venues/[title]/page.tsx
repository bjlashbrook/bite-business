import { getVenueByTitle } from '@/api/venues';
import { sortDealsByDiscount } from '@/lib/utils/venueUtils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaBolt, FaBookOpen, FaLocationDot, FaMapLocationDot, FaPhone, FaRegClock, FaRegHeart } from 'react-icons/fa6';

// Set title and description metadata for SEO
export async function generateMetadata({ params }: { params: { title: string } }) {
  const { title } = await params;
  const venue = await getVenueByTitle(title);

  if (!venue) {
    return {
      title: 'Venue Not Found',
      description: 'The requested venue could not be found.'
    };
  }

  return {
    title: `Eatclub Challenge | ${venue.name}`,
    description: `Discover ${venue.name}, a top restaurant offering ${venue.cuisines.join(', ')} in ${venue.suburb}. Check out current deals and more!`
  };
}

export default async function Venue({ params }: { params: Promise<{ title: string }> }) {
  const { title } = await params;
  const venue = await getVenueByTitle(title);

  if (!venue) {
    notFound();
  }

  const sortedDeals = sortDealsByDiscount(venue.deals);

  return (
    <div className="container mx-auto p-4 pt-0">
      <div className="relative w-full h-80 mb-6 overflow-hidden shadow-md">
        <Image src={venue.imageLink} alt={venue.name} fill className="object-cover" priority />
      </div>

      <ul className="flex justify-around items-center gap-4 mb-6 text-gray-600 border-b pb-4">
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

      <h1 className="text-3xl font-bold leading-tight text-black mb-2">{venue.name}</h1>

      <p className="text-sm text-gray-500 mb-4">{venue.cuisines.join(' • ')}</p>

      <div className="flex flex-col gap-3 text-gray-700 mb-6">
        <div className="flex items-center gap-2">
          <FaRegClock size={16} className="" />
          <span className="text-sm font-medium">
            Hours: {venue.open} - {venue.close}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaLocationDot size={16} className="" />
          <span className="text-sm">
            {venue.address1}, {venue.suburb}
          </span>
        </div>
      </div>

      <ul className="space-y-2 mb-8">
        {sortedDeals.map(deal => (
          <li key={deal.objectId} className="flex justify-between">
            <div>
              <h2 className="flex items-center text-(--ec-red) text-2xl">
                {deal.lightning && <FaBolt className="text-yellow-500 me-1" size={20} />}
                <span className="font-bold">
                  {deal.discount}% off {deal.dineIn && ' • Dine In'}
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

      <p className="text-gray-700 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus repellat ducimus doloribus, porro beatae
        molestiae odio consequatur aspernatur vero hic neque ab voluptatibus harum culpa, atque praesentium impedit
        repudiandae dolor.
      </p>

      <p className="text-gray-700 mb-4">
        Odit rem eaque aliquid sunt fuga autem quaerat id cumque veritatis, eligendi, aspernatur magnam a repellendus.
        Perferendis amet deleniti ex numquam illum dolore eaque quidem vel. Possimus reiciendis ab fugiat dolorum
        veritatis cupiditate, facilis maxime voluptate culpa magni exercitationem, sunt blanditiis?
      </p>

      <p className="text-gray-700">
        Magni itaque, debitis reiciendis quod iste, perspiciatis consequatur a mollitia laboriosam, necessitatibus
        labore minus voluptatum rem? Saepe exercitationem fugiat accusantium non libero voluptatibus nulla porro
        dignissimos magni nisi repudiandae, autem ipsa neque minus unde.
      </p>
    </div>
  );
}
