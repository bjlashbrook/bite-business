'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function VenueError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Venue page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-8 max-w-2xl text-center">
      <div className="bg-white p-12 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-black mb-4">Venue Unreachable</h2>
        <p className="text-gray-600">
          We couldn't load the details for this venue. It might be a temporary issue or the venue might no longer be
          available.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => reset()}
            className="px-8 py-3 rounded-full font-bold transition-colors text-(--ec-red) border-2 border-(--ec-red) hover:bg-(--ec-red) hover:text-white"
          >
            Try Refreshing
          </button>
          <Link
            href="/"
            className="px-8 py-3 rounded-full font-bold transition-colors text-(--ec-red) border-2 border-(--ec-red) hover:bg-(--ec-red) hover:text-white"
          >
            Back to Venues
          </Link>
        </div>
      </div>
    </div>
  );
}
