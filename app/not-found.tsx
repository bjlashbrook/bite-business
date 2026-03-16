import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Page Not Found</h3>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
