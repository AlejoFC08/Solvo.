# Solvo. — sitio web

Landing de una sola página en HTML, CSS y JavaScript, sin frameworks ni build.

## Estructura

```
index.html            Página completa
css/styles.css        Estilos (los colores de marca están en :root)
js/config.js          ← DATOS A COMPLETAR (WhatsApp, mail, Instagram, trabajos)
js/main.js            Menú del celular y carga de los datos de config.js
assets/               Logo, favicon, imagen para redes y capturas de trabajos
netlify.toml          Configuración de Netlify (Vercel no la necesita)
```

## Qué completar

Buscá `[COMPLETAR]` en el proyecto. Está en:

1. **`js/config.js`**: número de WhatsApp, mail, usuario de Instagram y los 3 trabajos.
   Guardá las capturas en `assets/trabajos/` (800 × 500 px, en `.webp` o `.jpg`, de menos de 150 KB).

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
