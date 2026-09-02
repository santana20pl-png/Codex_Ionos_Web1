# Auditoría de reparación — web.gss-consulting.de

Estado: revisión local, sin publicación en GitHub ni en IONOS.

## Actualización 2026-09-02 — Experiencia y estructura legal

- 🔴 Corregido: el bloque `GSS Experience` tenía textos sin claves de idioma y permanecía en alemán en español e inglés.
- 🔴 Corregido: se añadieron traducciones completas del bloque Experiencia para alemán, español e inglés.
- 🔵 Ajustado: `EU AI Act` queda inmediatamente después de `Impressum/Aviso legal` en el bloque legal.
- 🔵 Ajustado: `AZAV & Förderung` / `AZAV y financiación` queda en navegación, no dentro del bloque legal.
- 🟢 Conservado: `Datenschutz/Protección de datos` y `Cookies` permanecen como enlaces separados.
- 🟢 Conservado: `Events/Eventos` y `Blog` siguen visibles como accesos pendientes de activación.
- 🔴 Corregido: el enlace `Philosophie/Filosofía` del pie de la página principal ahora abre `vision.html` en lugar de apuntar a un ancla inexistente.
- 🔵 Ajustado: el orden de idiomas es ahora `DE → EN → ES` en las 23 páginas.
- 🔵 Ajustado: Facebook, TikTok y YouTube permanecen visibles como iconos inactivos, atenuados y sin navegación hasta configurar sus URLs.
- 🟢 Conservado: Instagram y LinkedIn permanecen como enlaces activos.
- 🔴 Corregido: se retiró el bloque AZAV/financiación de `legal.html`; la información queda centralizada en `azav-foerderung.html` y accesible desde Navegación.
- 🔴 Corregido: el panel responsive de `azav-foerderung.html` ya no queda oculto detrás del encabezado; se ajustó el espacio de seguridad del header para móvil/tablet.

## Cambios realizados

- Reparada la sintaxis rota de `script.js` que impedía ejecutar la web.
- Consolidada la carga global: cada una de las 23 páginas carga una sola vez `script.js`, `language.js`, `module-effects.js` y `mobile-nav.js`.
- Unificado el control del menú móvil/tablet mediante `mobile-nav.js`.
- Eliminado el segundo controlador de menú que estaba en `script.js`; el doble evento hacía que el menú se abriera y cerrara inmediatamente.
- Separadas las reglas responsive: desde 851 px la navegación permanece horizontal; hasta 850 px se usa el panel móvil/tablet con acordeones, también en páginas internas.
- Ajustado el comportamiento para que un navegador de escritorio con ratón mantenga la navegación horizontal incluso dentro de un panel de previsualización estrecho; los dispositivos táctiles mantienen el menú móvil/tablet.
- Añadidos `id="primary-navigation"` y `aria-controls` para que el botón móvil controle el mismo menú en la portada y páginas internas.
- Añadidos los enlaces de referencia de WhatsApp, Instagram y LinkedIn.
- Las redes todavía no configuradas se ocultan para evitar iconos que abran enlaces vacíos o mensajes de error.
- Conservados los accesos de Eventos y Blog como bloques pendientes para activarlos posteriormente.
- Añadidos los scripts globales a `agentur.html` y eliminada la carga duplicada de `formationen.html`.
- Conservado el chatbot local existente y preparada la conexión opcional a un backend mediante `AI_CHAT_ENDPOINT`.

## Configuración pendiente antes de publicar

- CRM: falta el endpoint/webhook real del proveedor. Se mantiene vacío para no enviar datos personales a un destino desconocido.
- WhatsApp, Instagram y LinkedIn: configurados con los datos de la página de referencia.
- Facebook, TikTok y YouTube: permanecen sin configurar y sus iconos se ocultan.
- Aviso legal: todavía contiene campos entre corchetes. Deben confirmarse los datos legales definitivos antes de publicar.
- Debe hacerse una prueba final de formularios, chatbot y menú en dispositivos reales o en el modo adaptable del navegador.

## Comprobaciones realizadas

- Sintaxis JavaScript: correcta en los cinco archivos JavaScript.
- Cabecera y scripts globales: correctos en 23 páginas.
- No queda la cadena defectuosa `setLanguagee`.
- El selector de idioma actualiza también la URL, el almacenamiento local, los enlaces internos y los metadatos SEO para que la elección se conserve al navegar y recargar.
- La publicación queda autorizada por el usuario para este paquete; `CNAME` y DNS no se modifican.

## Próximo paso seguro

La copia local se valida antes del envío; después se actualiza `santana20pl-png/Codex_Ionos_Web1` y se comprueba la publicación con el mismo `CNAME`.

## Correcciones posteriores — 3 de septiembre de 2026

- La entrada directa sin parámetro de idioma inicia siempre en alemán; `?lang=en` y `?lang=es` siguen funcionando de forma explícita.
- El pie de página de inicio se convirtió en el pie común de las 23 páginas, incluyendo FAQ, Eventos/Blog y redes configuradas o inactivas.
- La línea divisoria del bloque de marca usa el mismo acento azul claro del sistema visual neural.
- El enlace de financiación del encabezado dejó de tener apariencia de elemento permanentemente activo; el resaltado queda limitado al hover/foco visible.
- Se actualizó el cache-busting HTML a `global-13`.

