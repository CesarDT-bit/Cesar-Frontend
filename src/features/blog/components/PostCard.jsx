import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link to={`/blog/posts/${post.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full flex flex-col">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {post.body}
          </p>
        </div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Post #{post.id}</span>
          <span className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
            Leer más →
          </span>
        </div>
      </div>
    </Link>
  );
}