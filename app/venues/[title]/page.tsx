import { getVenueByTitle } from '@/api/venues';
import { notFound } from 'next/navigation';
import { VenueHeader } from '@/components/venue/VenueHeader';
import { VenueInfo } from '@/components/venue/VenueInfo';
import { VenueDeals } from '@/components/venue/VenueDeals';
import { VenueDescription } from '@/components/venue/VenueDescription';

// Set title and description metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ title: string }> }) {
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

  return (
    <>
      <VenueHeader imageLink={venue.imageLink} name={venue.name} />

      <div className="container mx-auto p-4 pt-0">
        <div className="md:flex md:gap-8 md:mt-12">
          <VenueInfo venue={venue} />

          <VenueDeals deals={venue.deals} />
        </div>

        <VenueDescription />
      </div>
    </>
  );
}
