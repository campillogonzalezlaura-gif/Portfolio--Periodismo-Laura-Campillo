import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());

// Lazy-initialized Gemini client
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// System Instruction that sets the persona of Laura's virtual self
const SYSTEM_INSTRUCTION = `
Eres la Asistente Virtual Oficial Inteligente de Laura Campillo González. Tu propósito es representar profesionalmente a Laura ante posibles reclutadores, editores, compañeros o clientes interesados en su perfil como Periodista y Comunicadora.

Debes responder siempre con un tono profesional, cortés, creativo, empático, moderno y estructurado. Comunícate preferentemente en español de España (o inglés si te preguntan en inglés).

INFORMACIÓN CURRICULAR DE LAURA:
- Nombre: Laura Campillo González
- Profesión: Periodista, Especialista en Contenido Digital y Redacción SEO.
- Correo: campillogonzalezlaura@gmail.com
- Teléfono: 654922657
- Grado Académico:
  * Grado en Periodismo (2020-2024), Universidad Carlos III de Madrid.
  * Máster en Escritura Creativa (2025-2026), Universidad Complutense de Madrid.
- Formación Complementaria:
  * Inteligencia Artificial aplicada a la empresa (2026), Fedeto Formación | Universidad de Nebrija (27 créditos). Enfoque en creación de contenidos, automatización, análisis de información y marketing digital con IA.
  * Curso de Gestión de Librerías (2024-2025), Escuela de Formación Parix.
- Experiencia Profesional:
  1. Redactora en prácticas en "65 Y MÁS" (Prensa digital, 5 meses): Redacción de noticias y reportajes para audiencias específicas, optimización SEO para buscadores digitales, selección de recursos visuales editoriales y adaptación de contenidos para el canal online con máxima usabilidad.
  2. Colaboradora en "El Perfil de Ocaña" (Prensa local y regional digital/física): Elaboración rigurosa de noticias de actualidad del municipio y comarca, dominio de variedad de áreas temáticas y capacidad para amoldar el tono y registro al tema tratado.
- Competencias Humanas / Soft Skills:
  * Escritura creativa, persuasiva y divulgativa de primer nivel.
  * Capacidad de análisis crítico de la realidad social y cultural.
  * Excelente organización, planificación estructurada y rigor metodológico.
  * Proactividad, iniciativa e innovación.
  * Trabajo en equipo colaborativo y de alto rendimiento.
- Habilidades Técnicas:
  * CMS: WordPress, paneles de gestión de contenido.
  * Marketing & SEO: Búsqueda de keywords, analítica de métricas, optimización on-page de reportajes.
  * Diseño & Maquetación: Adobe InDesign, Photoshop, maquetación de interactivos y maquetación física.
  * Ofimática y Datos: Excel Avanzado, tablas dinámicas, análisis descriptivo y visualización de datos.
  * IA Generativa: Ingeniería de prompts, generación responsable de borradores, curación de información.
- Idiomas:
  * Español: Nativo (Prosa fluida, redacción impecable).
  * Inglés: Nivel B2 certificado por Cambridge (Fluidez hablada y escrita perfecta para redacciones bilingües).

INSTRUCCIONES DE RESPUESTA:
1. Responde de forma concisa. Estructura las respuestas con viñetas o listas cuando expliques habilidades o experiencias para que sean fáciles de escanear (estilo periodístico).
2. Si te preguntan sobre qué puede aportar a una empresa, resalta su perfil híbrido: combina la rigurosidad periodística clásica, la destreza en la narrativa creativa del máster, y los conocimientos analíticos modernos (SEO, Excel, Inteligencia Artificial).
3. Nunca inventes certificaciones, estudios o empresas que no estén listados en el currículum de Laura.
4. Si el usuario pide datos de contacto, bríndalos con amabilidad e indícales que también pueden rellenar el formulario de contacto en el portfolio.
`;

// Simple keyword-based backup simulation in case GEMINI_API_KEY is not defined
function getAutomatedFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("contacto") || msg.includes("email") || msg.includes("correo") || msg.includes("teléfono") || msg.includes("telefono") || msg.includes("llamar") || msg.includes("escribir")) {
    return "¡Hola! Puedes ponerte en contacto con Laura directamente a través de su correo electrónico **campillogonzalezlaura@gmail.com** o llamándola al teléfono **654922657**. También puedes enviarle un mensaje rápido rellenando el formulario de contacto que se encuentra al final de este portafolio digital.";
  }
  
  if (msg.includes("seo") || msg.includes("posicionamiento") || msg.includes("búsqueda") || msg.includes("keywords") || msg.includes("analítica") || msg.includes("datos")) {
    return "Laura tiene un fuerte perfil técnico en **optimización SEO y análisis de datos**. Durante su experiencia en la prensa digital '*65 Y MÁS*', lideró la optimización de contenidos bajo criterios SEO on-page, buscando optimizar la visibilidad y mejorar el posicionamiento orgánico. Además, maneja **Excel Avanzado** y herramientas de análisis técnico para medir la tracción y clics de las publicaciones.";
  }

  if (msg.includes("experiencia") || msg.includes("trabajo") || msg.includes("trabajó") || msg.includes("practica") || msg.includes("puesto") || msg.includes("historial") || msg.includes("empresa")) {
    return "El historial profesional de Laura se compone principalmente de:\n\n" +
           "1. **Redactora en prácticas en '65 Y MÁS'** (Prensa digital, 5 meses): Donde redactó artículos informativos optimizados para SEO, seleccionó recursos visuales y adaptó contenidos para garantizar alta legibilidad.\n" +
           "2. **Colaboradora en 'El Perfil de Ocaña'** (Medio local digital/físico): Dedicada a elaborar crónicas y noticias de actualidad con alto rigor periodístico adaptando el tono a diferentes temas.\n\n" +
           "¿Te gustaría conocer más sobre alguna de estas etapas?";
  }

  if (msg.includes("ia") || msg.includes("inteligencia artificial") || msg.includes("prompt") || msg.includes("tecnología")) {
    return "Laura cuenta con formación especializada en **Inteligencia Artificial aplicada a la empresa** certificada por la Universidad de Nebrija (27 créditos). Sabe utilizar de manera ética y responsable los modelos de IA generativa para crear borradores estructurados, idear estrategias de contenido, analizar datos masivos de comunicación y automatizar flujos de trabajo repetitivos en la redacción.";
  }

  if (msg.includes("estudió") || msg.includes("estudio") || msg.includes("universidad") || msg.includes("grado") || msg.includes("máster") || msg.includes("master") || msg.includes("educación") || msg.includes("formación")) {
    return "Laura cuenta con una sólida formación académica:\n\n" +
           "- **Grado en Periodismo** (2020-2024) por la Universidad Carlos III de Madrid.\n" +
           "- **Máster en Escritura Creativa** (2025-2026) por la Universidad Complutense de Madrid.\n" +
           "- **Curso de Inteligencia Artificial aplicada a la empresa** por la Universidad de Nebrija.\n" +
           "- **Curso de Gestión de Librerías** impartido por Parix.";
  }

  if (msg.includes("inglés") || msg.includes("ingles") || msg.includes("idiomas") || msg.includes("idioma") || msg.includes("english")) {
    return "Laura domina dos idiomas:\n\n" +
           "- **Español (Nativo):** Excelente dominio gramatical, redacción persuasiva y estilizada.\n" +
           "- **Inglés (B2 - Cambridge):** Fluidez conversacional e idoneidad técnica para redactar o investigar en entornos bilingües.";
  }

  return "¡Hola! Soy la Asistente de IA de Laura Campillo. He sido entrenada con sus datos profesionales. Puedo contarte acerca de su **Grado en Periodismo**, su **Máster en Escritura Creativa**, su experiencia laboral en **'65 Y MÁS'** y **'El Perfil de Ocaña'**, o sus habilidades en herramientas como **SEO, WordPress, InDesign e Inteligencia Artificial**. ¿Qué te gustaría saber?";
}

// API endpoint for interactive chat with Laura's profile AI
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Debe proporcionar una conversación en el campo 'messages'." });
    }

    const client = getGeminiClient();
    
    if (!client) {
      // Fallback with highly accurate simulated response when API key is missing
      console.warn("GEMINI_API_KEY no configurado. Utilizando respuesta del simulador local...");
      const lastUserMessage = messages[messages.length - 1].text;
      const responseText = getAutomatedFallbackResponse(lastUserMessage);
      
      // Simulate slight network delay for premium feel
      await new Promise((resolve) => setTimeout(resolve, 600));
      return res.json({ text: responseText, source: "offline-knowledge-base" });
    }

    // Convert message array to standard structure
    // Gemini API matches the format: contents: [{role: "user", parts: [{text: "..."}]}]
    const chatHistory = messages.map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Generate output utilizing the recommended gemini-3.5-flash model
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Disculpa, no he podido procesar una respuesta en este momento.";
    return res.json({ text: reply, source: "gemini-3.5-flash" });
  } catch (error: any) {
    console.error("Error en API de Chat de Gemini:", error);
    return res.status(500).json({ 
      error: "Ocurrió un contratiempo al procesar la respuesta con el motor de IA.",
      details: error.message 
    });
  }
});

// Configure Vite middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Iniciando Vite en modo desarrollo con Express...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Iniciando Express en modo producción de alto rendimiento...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor activo corriendo en http://localhost:${PORT}`);
  });
}

startServer();
