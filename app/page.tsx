import { getVenues } from '@/api/venues';
import VenueList from '@/components/venue/VenueList';

export default async function Home() {
  const venues = await getVenues();

  return (
    <div className="container mx-auto p-4">
      <VenueList venues={venues} />
    </div>
  );
}
