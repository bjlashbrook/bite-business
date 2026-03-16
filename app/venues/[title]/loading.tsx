export default function Loading() {
  return (
    <div className="container mx-auto p-4 pt-0 animate-pulse">
      {/* Hero Image Skeleton */}
      <div className="w-full h-80 bg-gray-200 mb-6 rounded-lg" />

      {/* Action Bar Skeleton */}
      <div className="p-4 pt-0 border-b pb-4 mb-6 border-gray-200">
        <ul className="container mx-auto flex justify-around items-center gap-4 text-gray-300">
          {[1, 2, 3, 4].map(i => (
            <li key={i} className="flex flex-col items-center gap-1">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="w-8 h-2 bg-gray-200 rounded" />
            </li>
          ))}
        </ul>
      </div>

      <div className="container mx-auto p-4 pt-0">
        <div className="md:flex md:gap-8 md:mt-12">
          <div className="md:w-1/2 xl:w-2/3">
            {/* Title & Cuisines Skeleton */}
            <div className="mb-8">
              <div className="h-9 bg-gray-200 w-3/4 mb-4 rounded" />
              <div className="h-4 bg-gray-200 w-1/2 rounded" />
            </div>

            {/* Info Section Skeleton */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 w-1/3 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 w-2/3 rounded" />
              </div>
            </div>
          </div>

          {/* Deals Section Skeleton */}
          <div className="md:w-1/2 xl:w-1/3 space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
