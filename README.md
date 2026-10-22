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

Buscá `[COMPLETAR]` en el proyecto. Aparece en dos archivos:

1. **`js/config.js`**: número de WhatsApp, mail, usuario de Instagram y los 3 trabajos.
   Guardá las capturas en `assets/trabajos/` (800 × 500 px, en `.webp` o `.jpg`, de menos de 150 KB).
2. **`index.html`** (en el `<head>`): reemplazá `https://TU-DOMINIO` por la dirección final del sitio.
   Lo necesitan WhatsApp, Facebook y LinkedIn para mostrar bien la imagen al compartir el link.

## Verla en local

- **Rápido:** doble clic en `index.html`.
- **Como en producción:** en VS Code instalá la extensión **Live Server**, abrí esta carpeta,
  clic derecho sobre `index.html` → **Open with Live Server**. Se recarga sola cada vez que guardás.

## Publicar en Netlify

**Opción A — arrastrar y soltar (sin GitHub):**
entrá a <https://app.netlify.com/drop> y arrastrá la carpeta del proyecto
(sin `Solvo kit/`, que no hace falta).

**Opción B — conectado a GitHub (recomendada, se actualiza sola con cada push):**

1. Creá un repo vacío en GitHub y subí este proyecto:
   `git remote add origin <url-del-repo>` y `git push -u origin main`.
2. En Netlify: **Add new site → Import an existing project → GitHub** y elegí el repo.
3. Build command: vacío. Publish directory: `.`. Tocá **Deploy**.
4. En **Site configuration → Change site name** elegí el subdominio (ej. `solvo.netlify.app`)
   o conectá tu dominio en **Domain management**.
5. Reemplazá `https://TU-DOMINIO` en `index.html` por esa dirección, hacé commit y push.

## Publicar en Vercel

**Add New → Project**, importá el repo, Framework Preset **Other**, sin build command → **Deploy**.
