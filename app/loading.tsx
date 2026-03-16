export default function Loading() {
  return (
    <div className="container mx-auto p-4 pt-12 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden h-96">
            <div className="w-full h-48 bg-gray-200" />
            <div className="p-4 space-y-4">
              <div className="h-6 bg-gray-200 w-3/4 rounded" />
              <div className="h-4 bg-gray-200 w-1/2 rounded" />
              <div className="h-4 bg-gray-200 w-1/4 rounded mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
