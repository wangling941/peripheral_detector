# 🗺️ Roadmap de Mejoras — Detector de Periféricos

Este documento recoge las líneas de evolución previstas para el sistema de detección y categorización de periféricos informáticos. Las fases están ordenadas por prioridad e impacto, de menor a mayor complejidad.

---

## Fase 1 – Mejora de precisión y experiencia de usuario (Inmediata)

- **Aumento del dataset**  
  Descargar 500+ imágenes por categoría con filtros de calidad mejorados (sin marcas de agua, sin duplicados, tamaño mínimo).  
  _Prioridad: Alta_

- **Data Augmentation**  
  Aplicar transformaciones sintéticas (rotaciones, escalados, cambios de brillo, reflejos horizontales) durante el preprocesado para aumentar la variabilidad del conjunto de entrenamiento.  
  _Prioridad: Alta_

- **Ajuste de hiperparámetros del modelo**  
  Utilizar GridSearchCV o RandomizedSearchCV para optimizar los parámetros del RandomForest (n_estimators, max_depth, min_samples_split, etc.).  
  _Prioridad: Alta_

- **Botón "Reportar error" en el frontend**  
  Permitir al usuario enviar la imagen mal clasificada junto con la corrección (etiqueta correcta) para alimentar un conjunto de datos de retroalimentación y reentrenar periódicamente.  
  _Prioridad: Media_

- **Persistencia de detecciones**  
  Guardar cada detección (imagen procesada, resultado, timestamp, usuario) en una base de datos SQLite / PostgreSQL para auditoría y análisis histórico.  
  _Prioridad: Media_

---

## Fase 2 – Escalabilidad y funcionalidades avanzadas (Mediano plazo)

- **Sistema de autenticación y roles**  
  Implementar registro/login con JWT y roles diferenciados: administrador, técnico de inventario, usuario consulta. Proteger rutas y endpoints según el perfil.  
  _Prioridad: Media_

- **Panel de historial y reportes**  
  Dashboard con listado paginado de detecciones, filtros por fecha, categoría y usuario. Exportación a CSV y PDF para informes de inventario.  
  _Prioridad: Media_

- **Detección de múltiples objetos por imagen**  
  Modificar el pipeline para identificar y clasificar todos los periféricos presentes en una misma imagen (no solo el de mayor área).  
  _Prioridad: Media_

- **Segmentación adaptativa por histograma**  
  Ajustar dinámicamente los umbrales HSV (bajo/alto) analizando el histograma de la imagen de entrada, mejorando la robustez ante cambios drásticos de iluminación.  
  _Prioridad: Media_

- **Mejora de la UI con tema cyberpunk final**  
  Completar la paleta de colores neón, añadir animaciones de entrada/salida, transiciones suaves y microinteracciones para una experiencia inmersiva.  
  _Prioridad: Baja_

---

## Fase 3 – Visión por computadora avanzada (Largo plazo)

- **Reemplazo del clasificador por Deep Learning (Transfer Learning)**  
  Sustituir RandomForest por EfficientNet-B0 o ResNet50 preentrenado en ImageNet, con fine-tuning sobre el dataset de periféricos. Esto mejorará drásticamente la precisión y permitirá añadir nuevas categorías con menos esfuerzo.  
  _Prioridad: Media_

- **Detección en tiempo real desde video**  
  Procesar flujo de video desde cámara IP, webcam o archivo de video, aplicando el pipeline frame a frame con una cola de procesamiento asíncrona.  
  _Prioridad: Baja_

- **Integración con IoT y cámaras de seguridad**  
  Conectar el sistema con sensores de presencia o cámaras ONVIF para disparar detecciones automáticas al detectar movimiento.  
  _Prioridad: Baja_

- **Notificaciones inteligentes**  
  Enviar alertas por correo o Telegram cuando se detecten dispositivos no registrados o patrones anómalos (ej. un equipo etiquetado como "monitor" aparece como "laptop" de forma recurrente).  
  _Prioridad: Baja_

---

## 📌 Notas sobre el roadmap

- Las prioridades pueden reordenarse según la evolución del proyecto y las necesidades del equipo.
- Cada fase está diseñada para ser incremental, de modo que se puedan entregar valor de forma continua sin depender de bloques completos.
- Se recomienda revisar este documento trimestralmente y actualizar el estado de cada ítem.

---

_Documento generado para planificación interna – vigente a partir de julio de 2026._
