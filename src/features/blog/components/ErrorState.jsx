export default function ErrorState({ 
  message = "Ocurrió un error al cargar los posts.", 
  onRetry 
}) {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
        <p className="text-red-600 mb-6">{message}</p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 font-medium"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}