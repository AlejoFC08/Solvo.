/*
 * ============================================================
 *  CONFIGURACIÓN DE SOLVO — editá SOLO este archivo
 * ============================================================
 *  Reemplazá cada "[COMPLETAR]" por el dato real y guardá.
 *  La página toma estos valores automáticamente.
 */
window.SOLVO_CONFIG = {
  // Presentación personal: se muestra solo cuando cargues tus datos reales.
  nombre: "",
  foto: "", // Ruta local, por ejemplo assets/perfil.webp.
  // Número de WhatsApp con código de país, sin "+", espacios ni guiones.
  // Ejemplo para Argentina (celular): "5491112345678"
  whatsapp: "[COMPLETAR]",

  // Mensaje que aparece precargado al abrir el chat de WhatsApp.
  whatsappMensaje: "Hola Solvo, quería hacerte una consulta.",

  // Tu mail de contacto. Ejemplo: "hola@solvo.com.ar"
  email: "[COMPLETAR]",

  // Tu usuario de Instagram, sin "@". Ejemplo: "solvo.ar"
  instagram: "[COMPLETAR]",

  // Proyectos destacados. El primero se muestra con mayor protagonismo.
  //  - imagen: ruta a la captura (ideal 800 × 500 px, en .webp o .jpg, menos de 150 KB).
  //            Guardala en assets/trabajos/ — ejemplo: "assets/trabajos/panaderia.webp"
  //  - cliente: nombre del cliente.
  //  - tipo:    tipo de trabajo (por defecto, "Página web").
  //  - url:     link al sitio publicado (opcional; dejalo en "" si no hay).
  trabajos: [
    {
      imagen: "assets/trabajos/happybox.jpg",
      cliente: "Happy Box",
      tipo: "Regalos · Catálogo de productos",
      descripcion: "Una web para recorrer regalos y detalles hechos a mano, descubrir categorías y armar un pedido. Una identidad cálida que acompaña la presentación de sus productos.",
      etiquetas: ["Catálogo", "Selección de productos", "Contacto por WhatsApp"],
      url: "https://alejofc08.github.io/WebHappyBox/index.html"
    },
    {
      imagen: "assets/trabajos/nexmant.jpg",
      cliente: "NexMant",
      tipo: "Mantenimiento integral · Sitio institucional",
      descripcion: "Presentación de una empresa de mantenimiento, restauración y remodelación edilicia. Servicios, trabajos realizados y vías de contacto reunidos en un sitio institucional.",
      etiquetas: ["Servicios", "Galería de trabajos", "Consultas"],
      url: "https://nexmant.com.ar/"
    },
    {
      imagen: "assets/trabajos/fretes-garcia.jpg",
      cliente: "Fretes García",
      tipo: "Estudio contable · Sitio profesional",
      descripcion: "Una presencia digital para presentar los valores del estudio y organizar sus servicios contables, impositivos y societarios, con acceso directo a sus canales de contacto.",
      etiquetas: ["Identidad profesional", "Servicios", "Contacto directo"],
      url: "https://estudiocontablefretesgarcia.com.ar/"
    }
  ]
};
