'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-24 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We encountered an unexpected error while loading the page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3 rounded-full font-bold transition-colors text-(--ec-red) border-2 border-(--ec-red) hover:bg-(--ec-red) hover:text-white"
      >
        Try again
      </button>
    </div>
  );
}
