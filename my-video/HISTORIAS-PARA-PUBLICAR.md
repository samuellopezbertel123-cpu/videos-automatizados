# Tres nuevos episodios de Crónicas del Tiempo

Formato común: **60 segundos exactos, vertical 1080×1920, 30 FPS**.
Estilo: ilustración animada 2D con personajes articulados, decorados históricos, color cinematográfico y sin marca de agua permanente.
No son copias de la plantilla de otro creador; ilustraciones vectoriales originales.

## 1. Tratamientos médicos antiguos que hoy dan miedo
**Composición:** `CRONICAS-MEDICINA-60S`
**Título recomendado:** ¿Te dejarías tratar por un médico de hace 500 años? 😨
**Descripción:** ¿Abrir el cráneo, extraer sangre o tratar una enfermedad con mercurio? Estos tratamientos existieron, pero no todos tuvieron el mismo riesgo ni se usaron en el mismo periodo. Algunos pacientes sobrevivieron a la trepanación; otros sufrieron intoxicaciones. Descubre cómo cambió la medicina. ¿Cuál te daría más miedo? #Historia #Medicina #CuriosidadesHistoricas #CronicasDelTiempo
**Precisión:** trepanación antigua, sangrías durante siglos, uso de mercurio principalmente desde el final del siglo XV en Europa. No presentar procedimientos como tratamientos vigentes ni como recetas.
**Fuentes:** Smithsonian NMAH https://www.americanhistory.si.edu/collections/object/nmah_1028361 ; Smithsonian Bloodletting Instruments https://repository.si.edu/items/511fb8ed-253c-43eb-a822-f65612352168 ; Science Museum https://collection.sciencemuseumgroup.org.uk/objects/co8100445/mercurial-cream-used-to-treat-syphilis-england-1880-1941

## 2. Cómo era ir al baño en distintas épocas
**Composición:** `CRONICAS-BANOS-60S`
**Título recomendado:** ¿Irías al baño con desconocidos? Así era antes 🚽
**Descripción:** En las letrinas públicas de algunas ciudades romanas no existían cubículos como los actuales. En castillos medievales, los residuos podían caer a pozos. Y durante mucho tiempo los orinales eran habituales. La historia de los baños es más sorprendente de lo que parece. ¿En qué época te costaría más vivir? #Historia #RomaAntigua #EdadMedia #Curiosidades #CronicasDelTiempo
**Precisión:** no todos los romanos o medievales usaban el mismo tipo de baño; la historia varió según lugar, clase y época.
**Fuentes:** Smithsonian https://www.smithsonianmag.com/history/how-the-ancient-romans-went-to-the-bathroom-180979056/ ; English Heritage https://www.english-heritage.org.uk/visit/inspire-me/blog/blog-posts/top-10-toilets-through-time/ ; BAUS https://www.baus.org.uk/museum/164/the_flush_toilet

## 3. Héroes famosos con un lado terrible
**Composición:** `CRONICAS-HEROES-60S`
**Título recomendado:** Tres héroes históricos y su lado más oscuro
**Descripción:** Alejandro Magno, Cristóbal Colón y Napoleón cambiaron la historia. Pero detrás de sus grandes hazañas también hubo destrucción, esclavización y decisiones violentas. Conocer toda la historia es mejor que quedarse solo con las estatuas. ¿A cuál te habían contado de otra forma? #Historia #AlejandroMagno #CristobalColon #Napoleon #CronicasDelTiempo
**Precisión:** distinguir hechos documentados del juicio de valor. Alejandro y Tebas (335 a. C.); Colón y la esclavización indígena; Napoleón, ley de 1802 y política colonial — la aplicación tuvo diferencias territoriales.
**Fuentes:** Britannica https://www.britannica.com/biography/Alexander-the-Great ; History https://www.history.com/articles/christopher-columbus ; Asamblea Nacional francesa https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/consulat-et-premier-empire/retablissement-progressif-de-l-esclavage

## Proceso automatizado

En Codespaces:
```bash
cd /workspaces/videos-automatizados
git pull origin main
cd my-video
npm ci
npm run dev
```
En Remotion Studio están las tres composiciones nuevas para inspeccionar.

**Voces:** la generación por el conector de ElevenLabs estuvo ocupada y no produjo las tres voces. Para automatizarlas directamente en el proyecto, configura **ELEVENLABS_API_KEY** como secreto de Codespaces en GitHub (NO compartir la clave por chat ni incluirla en el repo). La misma voz que el episodio Pompeya se configura por defecto: `9TZnk0CAGA9YiCg6gU9Q`. La API usa `eleven_multilingual_v2` por defecto; puedes ajustar el modelo con `ELEVENLABS_MODEL_ID`.

```bash
npm run voices:history
npm run render:historia-batch
```
**Importante:** `voices:history` solicita narraciones nuevas y puede consumir créditos. No repite archivos existentes salvo que se ejecute el script directamente con `--force`. Después de generar el audio se crea un manifiesto con tiempos de subtítulos provenientes del audio real.

Los tres MP4 resultantes se guardarán en:
- `my-video/out/medicina.mp4`
- `my-video/out/banos.mp4`
- `my-video/out/heroes.mp4`

Si no hay voces, `render:historia-batch` exporta **previsualizaciones con música y texto**, no videos finales para publicar. Las tres voces son requisito de publicación.

## Control de calidad antes de publicar
- 1800 fotogramas, 30 FPS, 1080×1920.
- Voz completa y natural; que las últimas palabras no queden cortadas.
- Subtítulos ajustados al audio real, máximo 1 o 2 líneas, sin cortar palabras.
- Personajes, fondos, movimiento y ninguna transición destellante excesiva.
- Los tres videos usan hechos verificables y ofrecen matices históricos.
- Revisar licencias de narración/música y no subir recursos de otros creadores.
