import { Venue } from '@/types/venues';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getVenues(): Promise<Venue[]> {
  try {
    // Only delay if we are not in a testing environment
    if (!process.env.VITEST) {
      await delay(2000);
    }

    const res = await fetch('https://eccdn.com.au/misc/challengedata.json', {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error(`API response error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch venues: ${res.status}`);
    }

    const data = await res.json();

    if (!data || !data.restaurants) {
      console.error('Invalid data structure received from API', data);
      return [];
    }

    return data.restaurants;
  } catch (error) {
    console.error('Error in getVenues:', error);
    // Re-throw so the nearest error boundary can handle it
    throw error;
  }
}

export async function getVenueByTitle(title: string): Promise<Venue | null> {
  try {
    const venues = await getVenues();
    const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');
    return venues.find(v => slugify(v.name) === title) || null;
  } catch (error) {
    console.error(`Error in getVenueByTitle for "${title}":`, error);
    throw error;
  }
}
