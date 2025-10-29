import { useParams, Link, useNavigate } from "react-router-dom";
import { usePost } from "../hooks/useBlog";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(id);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-600">Post no encontrado</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Volver
          </button>
        </nav>

        <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-700 leading-relaxed">{post.body}</p>
        </article>
      </div>
    </div>
  );
}