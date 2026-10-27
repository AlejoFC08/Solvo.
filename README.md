# Solvo. — sitio web

Sitio en HTML, CSS y JavaScript, sin frameworks ni build. El inicio es breve y el portfolio completo vive en proyectos.html.

## Estructura

```
index.html            Página completa
css/styles.css        Estilos (los colores de marca están en :root)
css/premium.css       Diseño visual, tarjetas y preguntas frecuentes
js/config.js          ← DATOS A COMPLETAR (WhatsApp, mail, Instagram, trabajos)
js/main.js            Menú del celular y carga de los datos de config.js
assets/               Logo, favicon, imagen para redes y capturas de trabajos
netlify.toml          Configuración de Netlify (Vercel no la necesita)
```

## Qué completar

Buscá `[COMPLETAR]` en el proyecto. Está en:

1. **`js/config.js`**: número de WhatsApp, mail, usuario de Instagram y los 3 trabajos.
   Guardá las capturas en `assets/trabajos/` (800 × 500 px, en `.webp` o `.jpg`, de menos de 150 KB).

Los contactos sin completar y los trabajos de ejemplo quedan ocultos automáticamente.
Podés agregar trabajos al listado cuando tengas el nombre y una captura real.

La sección de contacto no tiene formulario: los botones de WhatsApp y mail
aparecen cuando cargás esos datos en `js/config.js`.

## Presentación y caso real

En `js/config.js`, `nombre` y `foto` permiten mostrar el nombre profesional y un
retrato real. La foto debe ser un archivo dentro de `assets/` (webp, jpg o png).
Mientras no estén completos, esos elementos permanecen ocultos.

La demostración del caso del colegio es ilustrativa: usa datos ficticios y no
procesa documentos ni envía correos. No reemplaza capturas del sistema real.
Para publicar capturas o testimonios, aportar el material autorizado y quitar
datos personales de empleados e institución.

## Medición preparada (pendiente de conectar)

`js/conversion.js` emite eventos `solvo:analytics` y los agrega a `window.dataLayer`
solo si una herramienta conectada ya creó esa cola. No instala proveedores, no
envía información por su cuenta y no guarda estadísticas centrales.

Eventos: `solvo_page_view`, `solvo_service_select` (web/automatizacion),
`solvo_demo_start`, `solvo_demo_step` y `solvo_contact_click` (canal).
No se incluyen mensajes, nombres, emails ni teléfonos en estos eventos.
Un clic de contacto mide intención; no confirma que se haya recibido una consulta.
Para obtener informes hace falta elegir una herramienta, conectar la cuenta y
configurar los eventos y las preferencias de privacidad correspondientes.

## Dominio propio (pendiente de elección y registro)

1. Elegir y registrar el dominio a nombre del titular del emprendimiento.
2. Agregarlo al proyecto existente en Netlify, en Domain management.
3. Configurar en el registrador los registros DNS indicados por Netlify.
4. Comprobar HTTPS y elegir el dominio principal, con su redirección.
5. Actualizar `canonical`, `og:url` y `og:image` en `index.html` con el dominio real.
6. Contratar o conectar por separado el correo de ese dominio y cargarlo en config.

No se compró ni conectó un dominio nuevo. El sitio conserva su dirección actual.

## Portfolio

La sección `#proyectos`, cerca del inicio, se carga desde `trabajos` en config.
El primer proyecto ocupa la tarjeta principal en escritorio. Las capturas reales
están en `assets/trabajos/`, guardadas como JPEG, sin iframes ni dependencias de
servicios de capturas externos. Fecha de captura: 24 de octubre de 2026.
Los proyectos actuales son Happy Box, NexMant y Estudio Contable Fretes García.
Para agregar uno, sumar un objeto con imagen, cliente, tipo, descripcion,
etiquetas y url. Cada apertura emite `solvo_project_open` con el nombre del proyecto.

El proyecto principal es el sistema de recibos de sueldo. Su descripción se
basa en la guía de la copia de portfolio, revisada el 24 de octubre de 2026.
La captura `sistema-recibos.jpg` muestra solo el panel de ejemplo, con directorio
vacío y contadores en cero; excluye la cuenta de Google y sus barras de usuario.
El sistema registra envíos: un estado enviado no certifica lectura ni recepción.
El usuario confirmó que los cuatro archivos son demos sin datos para su portfolio
personal y autorizó sus enlaces públicos. Las tres herramientas y el sistema
principal tienen enlaces a sus copias de demostración. No se cambiaron permisos
ni contenido de las planillas.

## Verla en local

- **Rápido:** doble clic en `index.html`.
- **Como en producción:** en VS Code instalá la extensión **Live Server**, abrí esta carpeta,
  clic derecho sobre `index.html` → **Open with Live Server**. Se recarga sola cada vez que guardás.

## Publicación

El sitio está publicado en **https://solvo-ar.netlify.app**, conectado a este repo de GitHub.
Cada `git push` a `main` lo vuelve a publicar automáticamente en Netlify, en menos de un minuto.

Si conectás un dominio propio (Netlify → **Domain management**), actualizá la dirección
en las 3 líneas `canonical`, `og:url` y `og:image` del `<head>` de `index.html`.

Detalles de configuración en Netlify: build command vacío, publish directory `.`,
y visibilidad del proyecto en **Public** (General → Visitor access).

## Navegación resumida

index.html: presentación, dos servicios, selección breve de proyectos, proceso y contacto.
proyectos.html: portfolio completo, sistema principal, demo interactiva, herramientas y preguntas frecuentes.
css/layout.css: tamaños compactos del inicio y navegación entre páginas.
Los enlaces antiguos a #casos, #demo-titulo, #herramientas-titulo y #preguntas desde el inicio se redirigen al portfolio.

## Contacto y medición de consultas

WhatsApp y correo reales están configurados. El botón de la portada abre una
consulta general; las tarjetas permiten elegir un servicio y preparan un mensaje
de WhatsApp y un asunto de correo específicos. No se envían mensajes automáticamente.

La integración de GA4 está en `js/analytics.js`. `analyticsId` en config permanece
vacío hasta disponer de una propiedad real. En ese estado no carga Google Analytics
ni muestra el aviso de estadísticas. Para conectarla, crear una propiedad web en
la cuenta del titular y cargar su ID G-…; ambas páginas ya incluyen el adaptador.
Con un ID válido, el visitante decide si permite estadísticas. Puede cambiar su
elección desde el pie de página. El adaptador limita los datos de los eventos a
servicio, canal, nombre del proyecto o paso de demostración.

Eventos de interés: selección de servicio y clic de contacto. **Un clic no equivale
a una consulta recibida.** Para medir consultas reales, contabilizar las conversaciones
nuevas efectivamente recibidas en WhatsApp o Gmail y registrar semanalmente:

| Semana | Canal | Servicio | Consultas recibidas | Propuestas enviadas | Proyectos confirmados |
| --- | --- | --- | --- | --- | --- |

No sumar mensajes de prueba, seguimientos de la misma conversación ni clics sin
mensaje. Preguntar de dónde llegó cada consulta cuando el origen no esté claro.
Comparar estas cifras con los clics de Analytics; el sitio no accede a WhatsApp ni
al buzón y no puede confirmar por su cuenta la recepción de una consulta.

La publicación automática requiere resolver los despliegues que Netlify marca
como `Skipped`. GitHub contiene los últimos cambios; no confundir un push correcto
con que la web pública ya se haya actualizado.
