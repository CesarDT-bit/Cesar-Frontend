export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
          <div className="p-6 space-y-4">
            <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}