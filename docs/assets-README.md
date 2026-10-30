# Assets — Portfolio Laura (Ceniza y Burdeos)

Copia `src/assets` y `src/styles` dentro de tu proyecto Vite. Cada imagen viene en `.png` y `.webp` (usa webp en producción).

| Archivo | Uso |
|---|---|
| images/hero/hero-ruins(@2x) | Ilustración del hero (con degradado a negro a la izquierda) |
| images/game/game-bg | Fondo del minijuego **sin** personaje ni ecos |
| images/game/game-reference | Escena original, solo de referencia |
| images/projects/echoes-library | Miniatura proyecto "Echoes" |
| images/projects/unity-essentials | Miniatura proyecto "Unity Essentials" |
| sprites/hooded-runner | Personaje del minijuego (fondo transparente) |
| sprites/hooded-hero | Personaje del hero, por si quieres animarlo aparte |
| sprites/echo-crystal(-large) | Ecos/cristales (raster, con halo) |
| icons/crystal.svg | Eco en vector — recomendado para el juego |
| icons/*.svg | Rombo, destello, logo, flecha, esquina de marco, divisor (usan currentColor) |

Íconos de marca (GitHub, Unity): usar `simple-icons` o `lucide-react`, no vienen aquí.

Nota: todo se recortó de un mockup de 1536×1024, así que la resolución es limitada
(el hero mide 976 px de ancho). Para producción conviene regenerar las ilustraciones en alta
o pasarlas por un upscaler (p. ej. Real-ESRGAN).
