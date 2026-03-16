import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getVenues, getVenueByTitle } from './venues';

const mockVenuesData = {
  restaurants: [
    {
      objectId: '1',
      name: 'Test Venue',
      address1: '123 Test St',
      suburb: 'Suburb',
      cuisines: ['Test'],
      imageLink: '/test.jpg',
      open: '11am',
      close: '10pm',
      deals: []
    }
  ]
};

const server = setupServer(
  http.get('https://eccdn.com.au/misc/challengedata.json', () => {
    return HttpResponse.json(mockVenuesData);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Venues API', () => {
  it('should fetch and return venues', async () => {
    const venues = await getVenues();
    expect(venues).toHaveLength(1);
    expect(venues[0].name).toBe('Test Venue');
  });

  it('should find a venue by title slug', async () => {
    const venue = await getVenueByTitle('test-venue');
    expect(venue).not.toBeNull();
    expect(venue?.name).toBe('Test Venue');
  });

  it('should return null if venue title does not match', async () => {
    const venue = await getVenueByTitle('wrong-name');
    expect(venue).toBeNull();
  });

  it('should handle API error status codes', async () => {
    server.use(
      http.get('https://eccdn.com.au/misc/challengedata.json', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(getVenues()).rejects.toThrow('Failed to fetch venues: 500');
  });

  it('should handle malformed response data', async () => {
    server.use(
      http.get('https://eccdn.com.au/misc/challengedata.json', () => {
        return HttpResponse.json({ something: 'else' });
      })
    );

    const venues = await getVenues();
    expect(venues).toEqual([]);
  });
});
