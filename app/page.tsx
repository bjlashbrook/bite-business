import { getVenues } from '@/api/venues';
import VenueList from '@/components/venue/VenueList';

export default async function Home() {
  const venues = await getVenues();

  return <VenueList venues={venues} />;
}
