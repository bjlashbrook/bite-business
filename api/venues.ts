import { Venue } from '@/types/venues';

export async function getVenues(): Promise<Venue[]> {
  const res = await fetch('https://eccdn.com.au/misc/challengedata.json', {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch venues: ${res.status}`);
  }

  const data = await res.json();
  return data.restaurants || [];
}

export async function getVenueByTitle(title: string): Promise<Venue | null> {
  const venues = await getVenues();
  const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');
  return venues.find(v => slugify(v.name) === title) || null;
}
