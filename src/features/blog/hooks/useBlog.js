import { useState, useEffect, useCallback } from 'react';
import { blogApi } from '../api/blogApi';
import { mockPosts, categories } from '../data/mockData';

export const useBlog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [stats, setStats] = useState({
    total: 0,
    displayed: 0,
    categories: {}
  });

  const fetchPosts = useCallback(async (useMock = false) => {
    try {
      setLoading(true);
      setError(null);

      if (useMock) {
        // Usar datos mock
        setTimeout(() => {
          const postsWithCategories = mockPosts.map(post => ({
            ...post,
            category: post.category || 'General'
          }));
          setPosts(postsWithCategories);
          setFilteredPosts(postsWithCategories);
          updateStats(postsWithCategories);
          setLoading(false);
        }, 1000);
      } else {
        // Usar API real
        const response = await blogApi.getPosts();
        const postsData = response.data.slice(0, 12).map(post => ({
          ...post,
          category: 'General', // Asignar categoría por defecto
          readTime: '3 min'
        }));
        setPosts(postsData);
        setFilteredPosts(postsData);
        updateStats(postsData);
        setLoading(false);
      }
    } catch (err) {
      console.warn('Error con API, usando datos mock:', err.message);
      // Fallback a datos mock
      fetchPosts(true);
    }
  }, []);

  const updateStats = (postsData) => {
    const categoryCount = postsData.reduce((acc, post) => {
      const category = post.category || 'General';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Asegurar que todas las categorías existan en las stats
    categories.forEach(cat => {
      if (cat !== 'Todos' && !categoryCount[cat]) {
        categoryCount[cat] = 0;
      }
    });

    setStats({
      total: postsData.length,
      displayed: postsData.length,
      categories: categoryCount
    });
  };

  // Filtrar posts basado en búsqueda y categoría
  useEffect(() => {
    let result = posts;

    // Filtrar por categoría
    if (selectedCategory !== 'Todos') {
      result = result.filter(post => 
        (post.category || 'General') === selectedCategory
      );
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.body.toLowerCase().includes(term)
      );
    }

    setFilteredPosts(result);
    
    // Actualizar estadísticas de posts mostrados
    setStats(prev => ({
      ...prev,
      displayed: result.length
    }));
  }, [posts, searchTerm, selectedCategory]);

  // Cargar posts al montar el componente
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    // Estado
    posts: filteredPosts,
    allPosts: posts,
    loading,
    error,
    searchTerm,
    selectedCategory,
    stats,
    categories,

    // Acciones
    setSearchTerm,
    setSelectedCategory,
    refetch: () => fetchPosts(false),
    retryWithMock: () => fetchPosts(true),

    // Utilidades
    hasPosts: filteredPosts.length > 0,
  };
};

// Hook para post individual
export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        setError(null);

        const postResponse = await blogApi.getPostById(postId);
        const postData = {
          ...postResponse.data,
          category: 'General',
          readTime: '3 min'
        };
        
        setPost(postData);
        
        try {
          const commentsResponse = await blogApi.getPostComments(postId);
          setComments(commentsResponse.data.slice(0, 5));
        } catch (commentsError) {
          console.warn('Error cargando comentarios:', commentsError.message);
          setComments([]);
        }
      } catch (err) {
        setError(err.message);
        // Fallback a mock data
        const mockPost = mockPosts.find(p => p.id === parseInt(postId)) || {
          ...mockPosts[0],
          id: parseInt(postId)
        };
        setPost(mockPost);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  return { post, loading, error, comments };
};