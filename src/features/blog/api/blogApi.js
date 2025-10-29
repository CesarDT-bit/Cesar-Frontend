import { mockPosts, authors, categories, featuredPost, popularPosts } from '../data/mockData';

// Simular delay de red para que parezca real
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

const simulateRandomError = () => {
  if (Math.random() < 0.15) {
    throw new Error("Error simulado del servicio de blog");
  }
};

export const blogApi = {
  getPosts: async () => {
    await delay();
    simulateRandomError();
    return { data: mockPosts };
  },

  getPostById: async (id) => {
    await delay();
    simulateRandomError();
    const post = mockPosts.find(p => p.id === parseInt(id));
    if (!post) throw new Error('Post no encontrado');
    return { data: post };
  },

  getPostsByPage: async (page = 1, limit = 10) => {
    await delay();
    simulateRandomError();
    const start = (page - 1) * limit;
    const end = start + limit;
    return { data: mockPosts.slice(start, end) };
  },

  getPostsByUser: async (userId) => {
    await delay();
    simulateRandomError();
    const posts = mockPosts.filter(p => p.userId === parseInt(userId));
    return { data: posts };
  },

  getPostsByCategory: async (category) => {
    await delay();
    simulateRandomError();
    if (category === 'Todos') return { data: mockPosts };
    const posts = mockPosts.filter(p => p.category === category);
    return { data: posts };
  },

  getFeaturedPost: async () => {
    await delay();
    simulateRandomError();
    return { data: featuredPost };
  },

  getPopularPosts: async () => {
    await delay();
    simulateRandomError();
    const posts = mockPosts.filter(p => popularPosts.includes(p.id));
    return { data: posts };
  },

  getCategories: async () => {
    await delay();
    return { data: categories };
  },

  getAuthors: async () => {
    await delay();
    return { data: authors };
  },

  getPostComments: async () => {
    await delay();
    simulateRandomError();
    // Comentarios de ejemplo
    return { data: [] };
  },

  createPost: async (postData) => {
    await delay();
    simulateRandomError();
    const newPost = {
      id: mockPosts.length + 1,
      ...postData,
      date: new Date().toISOString().split('T')[0]
    };
    return { data: newPost };
  },

  updatePost: async (id, postData) => {
    await delay();
    simulateRandomError();
    return { data: { id, ...postData } };
  },

  deletePost: async (id) => {
    await delay();
    simulateRandomError();
    return { data: { id } };
  },
};

export default blogApi;