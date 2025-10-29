// mockData.js

export const mockPosts = [
  {
    id: 1,
    title: "React Hooks: Mi viaje hacia componentes funcionales",
    body: "Los React Hooks revolucionaron completamente mi forma de escribir componentes. Descubrí cómo useState y useEffect pueden transformar código de clase en funciones más limpias y fáciles de mantener. En este artículo comparto mi experiencia migrando proyectos legacy y las lecciones aprendidas en el proceso.",
    userId: 1,
    category: "React",
    excerpt: "Mi experiencia personal migrando a React Hooks...",
    readTime: "8 min",
    date: "2024-10-19",
    tags: ["React", "Hooks", "JavaScript", "Frontend"]
  },
  {
    id: 2,
    title: "Python vs JavaScript: La elección que definió mi carrera",
    body: "Después de años trabajando con ambos lenguajes, he aprendido a valorar sus diferencias. Python brilla en automatización y ciencia de datos, mientras que JavaScript domina el desarrollo web moderno. En este post analizo en qué contexto cada uno destaca y cómo elegir sabiamente.",
    userId: 2,
    category: "Lenguajes",
    excerpt: "Reflexiones sobre mi experiencia con Python y JavaScript...",
    readTime: "12 min",
    date: "2024-10-17",
    tags: ["Python", "JavaScript", "Carrera", "Desarrollo"]
  },
  {
    id: 3,
    title: "Tailwind CSS: El diseño que cambió mi productividad",
    body: "Tailwind CSS llegó para quedarse. Tras resistirme inicialmente, descubrí cómo su sistema de utilidades permite prototipar más rápido sin comprometer la consistencia visual. En este artículo explico cómo lo integro con React y por qué hoy no puedo trabajar sin él.",
    userId: 3,
    category: "CSS",
    excerpt: "Cómo Tailwind CSS mejoró mi eficiencia en diseño...",
    readTime: "15 min",
    date: "2024-10-14",
    tags: ["Tailwind", "CSS", "Productividad", "Design System"]
  },
  {
    id: 4,
    title: "TypeScript: El aliado que todo desarrollador necesita",
    body: "TypeScript es mucho más que tipado estático. Desde que lo incorporé en mis proyectos, los errores en tiempo de ejecución se redujeron drásticamente y el trabajo en equipo se volvió más fluido. Te cuento cómo dar tus primeros pasos y qué beneficios notarás de inmediato.",
    userId: 1,
    category: "TypeScript",
    excerpt: "Por qué TypeScript se volvió indispensable en mi stack...",
    readTime: "10 min",
    date: "2024-10-12",
    tags: ["TypeScript", "JavaScript", "Calidad", "Desarrollo"]
  },
  {
    id: 5,
    title: "Node.js y Express: Construyendo el backend de mis sueños",
    body: "La dupla Node.js + Express me permitió desarrollar APIs escalables en tiempo récord. Desde autenticación JWT hasta middleware personalizados, comparto los aprendizajes más útiles que obtuve construyendo servicios para entornos productivos.",
    userId: 4,
    category: "Backend",
    excerpt: "Mi experiencia construyendo APIs con Node.js y Express...",
    readTime: "18 min",
    date: "2024-10-10",
    tags: ["Node.js", "Express", "API", "Backend"]
  },
  {
    id: 6,
    title: "Git: Los flujos de trabajo que salvan proyectos",
    body: "Git es más que control de versiones: es una filosofía de colaboración. En este artículo explico cómo los flujos basados en ramas, las revisiones de código y las estrategias de despliegue continuo pueden marcar la diferencia entre el caos y la eficiencia.",
    userId: 2,
    category: "Herramientas",
    excerpt: "Flujos de Git que transformaron cómo trabajo en equipo...",
    readTime: "14 min",
    date: "2024-10-08",
    tags: ["Git", "GitHub", "Colaboración", "DevOps"]
  },
  {
    id: 7,
    title: "Vue.js 3: Reencontrándome con la simplicidad",
    body: "Vue.js 3 me hizo recordar por qué amo programar. Su Composition API equilibra poder y simplicidad de una manera brillante. Te cuento cómo migré desde la Options API y por qué considero que Vue es una opción ideal para equipos pequeños y medianos.",
    userId: 3,
    category: "Vue",
    excerpt: "Mi reencuentro con la programación gracias a Vue.js 3...",
    readTime: "11 min",
    date: "2024-10-05",
    tags: ["Vue.js", "Composition API", "Frontend", "Frameworks"]
  },
  {
    id: 8,
    title: "Docker: Del caos de dependencias al orden containerizado",
    body: "Docker resolvió mis problemas con entornos inconsistentes. Desde desarrollo local hasta producción, aprendí a mantener todo sincronizado mediante contenedores. Aquí detallo cómo crear imágenes eficientes y evitar errores comunes al trabajar con Docker Compose.",
    userId: 1,
    category: "DevOps",
    excerpt: "Cómo Docker solucionó mis problemas de dependencias...",
    readTime: "16 min",
    date: "2024-10-03",
    tags: ["Docker", "Containers", "DevOps", "Deployment"]
  },
  {
    id: 9,
    title: "Testing: La confianza que cambia cómo programo",
    body: "Escribir tests cambió por completo mi forma de desarrollar. Ahora refactorizo sin miedo gracias a Jest y Testing Library. En este artículo comparto cómo comencé con TDD y las buenas prácticas que más impacto tuvieron en mis proyectos.",
    userId: 4,
    category: "Testing",
    excerpt: "Cómo el testing transformó mi confianza como desarrollador...",
    readTime: "13 min",
    date: "2024-10-01",
    tags: ["Testing", "Jest", "Calidad", "TDD"]
  },
  {
    id: 10,
    title: "GraphQL: Cuando REST ya no era suficiente",
    body: "GraphQL llegó justo cuando mis APIs REST comenzaban a volverse inmanejables. Su flexibilidad para definir consultas exactas cambió por completo la forma en que interactúo con los datos. Te muestro cuándo conviene adoptarlo y cómo evitar errores comunes.",
    userId: 2,
    category: "API",
    excerpt: "Mi transición de REST a GraphQL en proyectos reales...",
    readTime: "9 min",
    date: "2024-09-28",
    tags: ["GraphQL", "REST", "API", "Backend"]
  },
  {
    id: 11,
    title: "Next.js 14: El framework que unió frontend y backend",
    body: "Next.js 14 cambió las reglas del juego. Gracias a Server Components y el App Router, ahora puedo crear aplicaciones full-stack sin necesidad de un backend separado. En este artículo analizo su impacto y cómo mejoró la performance de mis proyectos.",
    userId: 3,
    category: "React",
    excerpt: "Next.js 14 y la evolución del desarrollo full-stack...",
    readTime: "17 min",
    date: "2024-09-25",
    tags: ["Next.js", "React", "Fullstack", "Performance"]
  },
  {
    id: 12,
    title: "MongoDB: La flexibilidad que mis datos necesitaban",
    body: "MongoDB me liberó de los esquemas rígidos de las bases relacionales. En este post explico cómo aproveché su modelo documental para construir sistemas más flexibles y adaptables a cambios rápidos en los requerimientos.",
    userId: 1,
    category: "Base de Datos",
    excerpt: "Por qué elegí MongoDB para mis proyectos más dinámicos...",
    readTime: "14 min",
    date: "2024-09-22",
    tags: ["MongoDB", "Database", "NoSQL", "Backend"]
  },
  {
    id: 13,
    title: "Performance: La búsqueda de la aplicación perfecta",
    body: "Optimizar performance se convirtió en mi obsesión. A través de técnicas como lazy loading, memoización y virtual scrolling, aprendí a mejorar la experiencia del usuario sin sacrificar mantenibilidad. Aquí comparto métricas clave y herramientas que recomiendo.",
    userId: 4,
    category: "Performance",
    excerpt: "Mi journey optimizando aplicaciones para performance...",
    readTime: "12 min",
    date: "2024-09-19",
    tags: ["Performance", "React", "Optimización", "UX"]
  },
  {
    id: 14,
    title: "Clean Code: Escribiendo para humanos, no solo máquinas",
    body: "El concepto de Clean Code transformó mi mentalidad como desarrollador. Aprendí que el código no solo debe funcionar, sino ser comprensible. En este post comparto principios esenciales y ejemplos prácticos que aplico cada día en mi trabajo.",
    userId: 2,
    category: "Buenas Prácticas",
    excerpt: "Cómo Clean Code mejoró mi código y colaboración...",
    readTime: "11 min",
    date: "2024-09-16",
    tags: ["Clean Code", "Best Practices", "Colaboración", "Calidad"]
  },
  {
    id: 15,
    title: "WebSockets: Llevando mis apps al mundo real-time",
    body: "Los WebSockets abrieron la puerta a experiencias interactivas. Desde chats en tiempo real hasta dashboards dinámicos, implementé soluciones con Socket.io que mantienen la conexión viva entre cliente y servidor. En este artículo explico cómo hacerlo paso a paso.",
    userId: 3,
    category: "WebSockets",
    excerpt: "Implementando aplicaciones en tiempo real con WebSockets...",
    readTime: "15 min",
    date: "2024-09-13",
    tags: ["WebSockets", "Real-time", "Socket.io", "Frontend"]
  }
];

export const categories = [
  "Todos",
  "React",
  "Lenguajes",
  "CSS",
  "TypeScript",
  "Backend",
  "Vue",
  "Herramientas",
  "DevOps",
  "Testing",
  "API",
  "Base de Datos",
  "Performance",
  "Buenas Prácticas",
  "WebSockets"
];

export const featuredPost = {
  id: 999,
  title: "Mi Journey en Desarrollo Web: 5 años de aprendizaje continuo",
  body: "Mirando atrás en estos 5 años como desarrollador, veo un camino de constante evolución. Desde mis primeros 'Hello World' en HTML hasta arquitecturas distribuidas en la nube, cada proyecto ha sido una lección. Comparto los momentos clave, tecnologías que marcaron diferencia y consejos para quienes empiezan.",
  userId: 1,
  category: "Reflexiones",
  excerpt: "5 años de crecimiento como desarrollador web...",
  readTime: "20 min",
  date: "2024-10-20",
  featured: true,
  tags: ["Carrera", "Aprendizaje", "Desarrollo", "Reflexiones"]
};

export const authors = {
  1: {
    name: "Ana García",
    role: "Senior Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  2: {
    name: "Carlos López",
    role: "Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  3: {
    name: "María Rodríguez",
    role: "UX Engineer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  4: {
    name: "David Chen",
    role: "DevOps Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
};

export const popularPosts = [1, 2, 5, 8, 11];
