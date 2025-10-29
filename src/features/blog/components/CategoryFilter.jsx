export default function CategoryFilter({ 
  categories = [], 
  selectedCategory, 
  onCategoryChange,
  postCounts = {} 
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{category}</span>
              {postCounts[category] !== undefined && (
                <span className="text-sm text-gray-500">
                  {postCounts[category]}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}