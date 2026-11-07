# CRÓNICAS DEL TIEMPO

Plantilla documental vertical para Remotion: 1080 × 1920, 30 FPS. Incluye una plantilla visual histórica reutilizable, con ilustraciones vectoriales originales y un área superior libre de logos y marcas para personalizar.

## Ejecutar y renderizar

```console
npm run dev
npx remotion render src/index.ts CRONICAS-DEL-TIEMPO-DEMO out/cronicas-del-tiempo-demo.mp4
npx remotion render src/index.ts CRONICAS-AKENATON out/cronicas-akhenaton.mp4
```

Abre `npm run dev` y selecciona `CRONICAS-AKENATON` en Remotion Studio para previsualizar la composición histórica de 30 segundos.

## Crear un video

1. Copia imágenes y audio con los derechos correspondientes en `public/assets/`.
2. Edita `src/documentary-data.ts`: `pompeiiDemo` contiene escenas, textos, tiempos de subtítulos, notas de investigación y pistas de audio.
3. Usa rutas relativas a `public` para los recursos. Por ejemplo, `assets/narracion.mp3` o `assets/archivo-01.jpg`.
4. Asigna `image` a cada escena para sustituir su ilustración vectorial. Añade `narration`, `music` o elementos a `soundEffects` para habilitar audio; ajusta los `from` y `duration` de `captions` para sincronizarlos con la narración.
5. Comprueba los datos históricos y licencias de cada recurso antes de publicar. Las notas del demo apuntan a UNESCO y al Parco Archeologico di Pompei como fuentes de verificación.

La plantilla histórica usa `src/SceneIllustration.tsx` para generar ilustraciones vectoriales originales. El demo de Pompeya usa `src/PompeiiArtwork.tsx` y `src/PompeiiFigure.tsx`; sus planos combinan escenarios, personajes, atmósfera y cámara en movimiento. Los subtítulos se sincronizan con los fotogramas y resaltan palabras clave.

La demo de Pompeya mantiene 1800 fotogramas (60 segundos) y organiza seis actos en 27 planos cortos de 45–70 fotogramas. `src/PompeiiArtwork.tsx` reúne escenarios vectoriales a pantalla completa; `src/PompeiiFigure.tsx` aporta figuras 2D articuladas con acciones de caminar, correr, señalar, mirar y excavar. Los planos usan movimientos de cámara y encuadres alternos; los subtítulos revelan palabras por etapas. La pista `public/assets/pompeii-ambience.wav` es una atmósfera de referencia original generada localmente, no una mezcla final ni una pista histórica. Sustitúyela por audio con licencia adecuada antes de publicar.

## Plantilla visual histórica

- `src/HistoricalMasterVideo.tsx` contiene la composición maestra y elementos SVG reutilizables: retrato esquemático, templo, mapa del valle del Nilo, disco solar de Atón, ficha de objeto, subtítulos, transiciones y capa VHS.
- `src/SceneIllustration.tsx` ofrece escenas vectoriales configurables para ciudades, batallas, mapas, excavaciones, ruinas, erupciones y artefactos.
- `src/akhenaten-demo.ts` define el episodio de muestra como datos. Cada escena especifica el tiempo, el tipo de ilustración, textos y rótulos; las fuentes de consulta están incluidas con el episodio.
- `CRONICAS-AKENATON` dura 900 fotogramas (30 segundos), a 30 FPS y 1080 × 1920. La demo alterna planos de faraón, templo, mapa, Atón y ruinas; las ilustraciones son gráficos originales, no material histórico de archivo.
- Los subtítulos de esta etapa se temporizan por escena y son texto de demostración; aún no se generan desde una narración ni se alinean automáticamente con voz. La música y los efectos tampoco están habilitados en este episodio. Esas automatizaciones quedan para etapas posteriores.

## Estructura

- `src/documentary-data.ts`: contenido del video y configuración de medios.
- `src/DocumentaryVideo.tsx`: composición y componentes reutilizables de escena y subtítulo.
- `src/Root.tsx`: registro de la composición vertical y demos originales.

## Comandos

```console
npm run lint
npm run build
```
