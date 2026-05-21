import { Article } from "./types";

export const ARTICLES_DATA: Article[] = [
  {
    id: "1",
    title: "¿Cumbres borrascosas?",
    category: "Escritura Creativa",
    subCategory: "Análisis Literario",
    snippet: "Una reseña y crítica profunda a la nueva adaptación audiovisual de esta novela clásica, analizando la fidelidad de la atmósfera indómita de Emily Brontë bajo una óptica contemporánea.",
    content: `¿Cumbres borrascosas? es una crítica detallada y apasionada sobre la nueva y polémica adaptación cinematográfica de la inmortal novela de Emily Brontë. Un examen sobre cómo se refractan el amor gótico, el rencor atemporal y los bellos páramos de Yorkshire en las lentes modernas.

### La dualidad entre la fidelidad histórica y la reinvención moderna
Esta nueva producción reaviva el debate sobre si se debe respetar cada línea de la obra original o atreverse a reinterpretar la psicología de Heathcliff y Catherine para el público de hoy. Una imperdible lectura crítica de un minuto que deconstruye este experimento narrativo.`,
    date: "Marzo 2026",
    readTime: "1 min",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
    externalUrl: "https://www.rubiales.org/data/uploads/perfil/perfil_254.pdf"
  },
  {
    id: "2",
    title: "Prohibido jugar a la pelota",
    category: "Prensa Digital",
    subCategory: "Crónica Urbana",
    snippet: "Una crónica reflexiva y nostálgica sobre el juego en las calles, las normativas de convivencia y la transformación de los espacios públicos que alejan la infancia de su hábitat natural de juego.",
    content: `Prohibido jugar a la pelota es un viaje crítico y literario por las plazas y calles de nuestras ciudades. Una reflexión profunda sobre cómo la creciente rigidez de las ordenanzas municipales de convivencia y el diseño hostil de los parques están marginando un juego tan libre, integrador y democrático como el de dar patadas a un balón.

### El espacio público como aula de socialización
El juego en la calle no es solo diversión; representa el primer contacto de la infancia con la negociación y la convivencia democrática. Cuando se clausuran estos espacios mediante carteles de "Prohibido jugar a la pelota", se arrebata a las nuevas generaciones un pilar insustituible para el desarrollo social y comunitario. Una lúcida e indispensable lectura de un minuto que analiza el pulso urbano contemporáneo.`,
    date: "Junio 2025",
    readTime: "1 min",
    imageUrl: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=600",
    externalUrl: "https://www.rubiales.org/data/uploads/perfil/perfil_246.pdf"
  },
  {
    id: "3",
    title: '"By a lady" de Jane Austen',
    category: "Escritura Creativa",
    subCategory: "Crítica Literaria",
    snippet: "Una inmersión crítica en el debut de Jane Austen, analizando cómo la célebre firma anónima 'By a lady' desafió las convenciones editoriales e inauguró una brillante era de sátira social.",
    content: `"By a lady" es un recorrido histórico y literario que rinde homenaje al audaz debut de una de las plumas más brillantes de la literatura universal: Jane Austen. El análisis aborda cómo el anonimato comercial de 1811 no fue un pacto de sumisión, sino un elegante escudo que le permitió desarmar con fina e inteligente ironía las rígidas estructuras sociales y de género de la época de la Regencia.

### El susurro satírico en la sociedad de la Regencia
Al amparo de ese sobrio "Escrito por una dama" en 'Sentido y sensibilidad', Austen exploró las tensiones económicas del matrimonio, la privación legal de la mujer y el eterno conflicto entre la prudencia sensata y la pasión desbordada. Una lectura crítica indispensable de un minuto que ilumina el eterno legado de la autora.`,
    date: "Octubre 2025",
    readTime: "1 min",
    imageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600",
    externalUrl: "https://www.rubiales.org/data/uploads/perfil/perfil_250.pdf"
  }
];

export const RESUME_DATA = {
  name: "Laura Campillo González",
  title: "Periodista & Comunicadora",
  shortDescription: "Graduada en Periodismo con experiencia en redacción de contenidos para medios digitales. Especializada en optimización SEO y gestión de contenido en entornos online, con formación avanzada en Inteligencia Artificial y analítica de datos aplicada a la comunicación.",
  email: "campillogonzalezlaura@gmail.com",
  phone: "654922657",
  linkedIn: "https://linkedin.com", // can placeholder link
  
  competencias: [
    "Escritura creativa y divulgativa",
    "Capacidad de análisis cultural",
    "Organización y planificación",
    "Iniciativa y proactividad",
    "Trabajo en equipo"
  ],
  
  habilidadesTecnicas: [
    "WordPress",
    "SEO Digital",
    "InDesign",
    "Excel Avanzado",
    "Análisis de Datos",
    "IA Generativa"
  ],
  
  idiomas: [
    { name: "Español", level: "Nativo", percentage: 100 },
    { name: "Inglés", level: "B2 (Cambridge)", percentage: 75 }
  ],
  
  experiencia: [
    {
      role: "Redactora en prácticas",
      company: "65 Y MÁS",
      type: "Prensa digital",
      duration: "5 meses",
      highlights: [
        "Redacción de artículos para medio digital con enfoque en audiencias específicas.",
        "Optimización SEO de contenidos para mejorar el posicionamiento orgánico.",
        "Búsqueda y selección de recursos visuales coherentes con la línea editorial.",
        "Adaptación de contenidos a formato online para máxima legibilidad."
      ]
    },
    {
      role: "Colaboradora",
      company: "El Perfil de Ocaña",
      type: "Medio local",
      duration: "Colaboración continua",
      highlights: [
        "Elaboración de noticias de actualidad con rigor y prontitud.",
        "Redacción en diferentes áreas temáticas, adaptando el tono según el tema.",
        "Publicación de contenidos en entorno digital y físico."
      ]
    }
  ],
  
  educacion: {
    grados: [
      {
        year: "2020 - 2024",
        title: "Grado en Periodismo",
        school: "Universidad Carlos III de Madrid"
      },
      {
        year: "2025 - 2026",
        title: "Máster en Escritura Creativa",
        school: "Universidad Complutense de Madrid"
      }
    ],
    complementaria: [
      {
        year: "2026",
        title: "Inteligencia Artificial aplicada a la empresa",
        school: "Fedeto Formación | Universidad de Nebrija (27 créditos)",
        desc: "Aplicación de IA en creación de contenidos, automatización, análisis de información y marketing digital."
      },
      {
        year: "2024 - 2025",
        title: "Curso de Gestión de Librerías",
        school: "Parix",
        desc: ""
      }
    ]
  }
};
