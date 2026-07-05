<p align="center">
  <img src="frontend/src/assets/logo.svg" alt="Logo Peripheral Detector" width="120">
</p>

<h1 align="center">🧠 Detector de TI</h1>
<p align="center">
  <strong>Algoritmo interactivo basado en segmentación cromática para la detección y categorización automática de hardware informático</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Estado-Desarrollo%20Activo-blue" alt="Estado: Desarrollo Activo">
  <img src="https://img.shields.io/badge/Versión-1.0.0-blue" alt="Versión 1.0.0">
  <img src="https://img.shields.io/badge/Licencia-MIT-green" alt="Licencia MIT">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-FastAPI%20%7C%20React%20%7C%20TypeScript%20%7C%20OpenCV%20%7C%20scikit--learn-333333" alt="Tech Stack">
  <img src="https://img.shields.io/badge/Tipo-Investigación%20Aplicada-5C2D91" alt="Tipo: Investigación Aplicada">
</p>

---

## 📖 **Descripción General**

**Peripheral Detector** es un proyecto de investigación aplicada desarrollado en el marco de la Escuela Profesional de Ingeniería de Sistemas de la Universidad César Vallejo (Lima, 2026). Su objetivo principal es optimizar la gestión de inventarios tecnológicos en laboratorios educativos mediante un algoritmo interactivo de detección y categorización automática de periféricos informáticos (monitores, laptops, torres de PC), utilizando técnicas de **visión por computadora** y **segmentación cromática** en el espacio de color HSV.

El sistema integra un **backend** robusto construido con FastAPI y OpenCV, que procesa imágenes y extrae descriptores morfológicos (área, perímetro, ratio de aspecto, momentos de Hu y color promedio), y un **frontend** moderno en React con Material-UI que permite al usuario capturar imágenes desde la cámara o subir archivos, visualizando en tiempo real la clasificación del dispositivo.

El proyecto se enmarca en el **Objetivo de Desarrollo Sostenible 4 (ODS 4)**, promoviendo una educación de calidad mediante la digitalización de procesos administrativos en entornos educativos.

---

## ✨ **Funcionalidades Principales**

- **🧠 Detección Automática de Periféricos**: Procesa imágenes digitales y aplica un pipeline de preprocesamiento (autocrop, filtrado), segmentación cromática en HSV y extracción de características geométricas y cromáticas.

- **📸 Captura desde Cámara**: Permite tomar fotografías directamente desde la cámara del dispositivo (webcam o móvil) para una detección inmediata.

- **📁 Subida de Imágenes**: Soporte para formatos JPG, PNG y BMP, con procesamiento asíncrono y feedback visual.

- **📊 Clasificación Inteligente**: Utiliza un modelo de **Random Forest** entrenado con un dataset de imágenes de periféricos, complementado con un clasificador heurístico de respaldo basado en el ratio de aspecto.

- **🎨 Interfaz Interactiva**: Diseño responsive con tres temas visuales (claro, oscuro y cyberpunk), ideal para entornos educativos y demostraciones tecnológicas.

- **📈 Escalabilidad**: Arquitectura modular que permite agregar nuevas categorías de periféricos (mouse, teclado, impresoras, etc.) simplemente ampliando el dataset y reentrenando el modelo.

- **🔬 Investigación y Análisis**: Generación de reportes técnicos con métricas de detección (área, perímetro, ratio, centroide) para análisis posteriores.

---

## 🛠️ **Tecnologías Utilizadas**

### **Backend**

- **FastAPI**: Framework web de alto rendimiento para construir la API REST.
- **OpenCV (cv2)**: Procesamiento digital de imágenes (PDI) y segmentación cromática.
- **scikit-learn**: Modelo de clasificación Random Forest.
- **NumPy & Pandas**: Manipulación de datos y extracción de características.
- **SQLAlchemy** (opcional): ORM para persistencia de resultados (en desarrollo).

### **Frontend**

- **React 18** con **TypeScript**: Interfaz de usuario moderna y tipada.
- **Material-UI (MUI)**: Componentes visuales y sistema de temas (claro, oscuro, cyberpunk).
- **react-webcam**: Captura de imágenes desde la cámara.
- **Axios**: Comunicación con la API REST.

### **Infraestructura y Herramientas**

- **Docker** & **Docker Compose**: Contenerización para desarrollo y despliegue.
- **Git & GitHub**: Control de versiones.
- **PostgreSQL** (opcional): Almacenamiento de resultados y trazabilidad.

---

## 🚀 **Instalación y Configuración**

Sigue estos pasos para levantar el proyecto en tu entorno local.

### **Prerrequisitos**

- Node.js (versión 18+)
- npm o yarn
- Python (versión 3.9+)
- pip

### **1. Clonar el repositorio**

```bash
git clone https://github.com/wangling941/peripheral_detector.git
cd peripheral_detector
```

### **2. Configurar el Backend**

# Crear y activar entorno virtual

```bash
cd backend
python -m venv venv
source venv/bin/activate   # En Windows: .\venv\Scripts\activate
```

### **3. Instalar dependencias**

```bash
pip install -r requirements.txt
```

### **4. Configurar variables de entorno**

```bash
cp .env.example .env
```

### **5. Editar .env con tus credenciales (si usas base de datos)**

```bash
# Configurar el Frontend
cd ../frontend
npm install
```

### **Preparar el Dataset de Imágenes (Entrenamiento)**

El sistema incluye scripts para descargar imágenes de periféricos desde DuckDuckGo y procesarlas para el entrenamiento del modelo.

### **Iniciar la Aplicación**

### **6. Desde la raíz del proyecto**

```bash
python scripts/download_images.py # Descarga 300 imágenes por categoría
python scripts/preprocess_dataset.py # Redimensiona y genera anotaciones
python scripts/extract_features.py # Extrae características (Hu, color, etc.)
python scripts/train_ml_model.py # Entrena el modelo Random Forest

```

### **7. Iniciar el backend (desde /backend)**

```bash
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **8. Iniciar el frontend (desde /frontend)**

```bash
npm start
```

La aplicación estará disponible en: http://localhost:3000

### **🏗️ Arquitectura del Proyecto**

El proyecto sigue una arquitectura limpia y modular, separando claramente las responsabilidades entre el backend, el frontend y los scripts de entrenamiento.

### ** Backend (FastAPI + OpenCV)**

```bash
backend/
├── app/
│ ├── api/ # Rutas y controladores de la API
│ ├── core/ # Núcleo del algoritmo de detección
│ │ ├── preprocessor.py # Preprocesamiento (autocrop, resize, filtros)
│ │ ├── segmenter.py # Segmentación cromática en HSV
│ │ ├── feature_extractor.py# Extracción de descriptores (área, ratio, Hu, color)
│ │ ├── classifier.py # Clasificador (Random Forest + heurístico)
│ │ └── detector.py # Pipeline completo
│ ├── models/ # Modelos SQLAlchemy (opcional)
│ ├── services/ # Servicios auxiliares
│ ├── utils/ # Utilidades y logging
│ └── config.py # Configuraciones (variables de entorno)
└── requirements.txt # Dependencias Python
```

### **Frontend (React + Material-UI)**

```bash
frontend/src/
├── components/ # Componentes reutilizables
│ ├── CameraCapture/ # Captura desde cámara
│ ├── FileUpload/ # Subida de imágenes
│ ├── ResultDisplay/ # Visualización de resultados
│ └── ThemeToggle/ # Botón de cambio de tema
├── context/ # Contextos (ThemeContext)
├── hooks/ # Custom hooks (useDetection)
├── services/ # Servicios API (Axios)
├── types/ # Definiciones de tipos (CSS modules)
├── App.tsx # Componente principal
└── index.tsx # Punto de entrada
```

### ** Scripts de Entrenamiento y Preparación de Datos**

```bash

scripts/
├── download_images.py # Descarga de imágenes desde DuckDuckGo
├── preprocess_dataset.py # Redimensiona y genera labels.csv
├── extract_features.py # Extrae características (Hu, color)
└── train_ml_model.py # Entrena Random Forest y guarda modelo
```

### **📸 Capturas de Pantalla**

<div align="center">
Interfaz Principal (Tema Cyberpunk)

<img src="frontend/src/assets/screenshots/cyberpunk-theme.png" width="800" alt="Cyberpunk Theme">

Resultado de Detección

<img src="frontend/src/assets/screenshots/detection-result.png" width="800" alt="Detection Result">

Subida de Imágenes

<img src="frontend/src/assets/screenshots/upload-panel.png" width="800" alt="Upload Panel">

Tema Claro

<img src="frontend/src/assets/screenshots/light-theme.png" width="800" alt="Light Theme">

</div>

### **🎯 Mejoras Futuras**

El proyecto está diseñado para ser escalable. Algunas mejoras planificadas incluyen:

Integración con Deep Learning (EfficientNet): Para mejorar la precisión de la clasificación, especialmente con imágenes complejas o con múltiples objetos.

Reconocimiento de Múltiples Objetos: Permitir la detección y categorización de varios periféricos en una misma imagen.

Persistencia de Resultados: Almacenar el historial de detecciones en una base de datos para generar reportes de inventario.

Soporte para Nuevos Periféricos: Mouse, teclado, impresoras, escáneres, etc. (solo agregar imágenes y reentrenar).

Despliegue en la Nube: Publicar la aplicación en servicios como Railway, Render o Vercel.

### **🤝 Contribuciones**

¡Gracias por tu interés en mejorar el proyecto!

Si encuentras un error, tienes una sugerencia o deseas proponer una mejora, puedes:

Abrir un Issue describiendo el problema o la idea.

Hacer un Fork del repositorio y enviar un Pull Request con tus cambios.

Todas las contribuciones serán revisadas antes de ser integradas al proyecto.

Si este proyecto te resultó útil o te sirvió como referencia, considera darle una ⭐ al repositorio. ¡Gracias por tu apoyo!

### **👨‍💻 Equipo de Desarrollo**

<p align="center"> <img src="frontend\assets\team\wangling.jpg" alt="WangLing" width="100" style="border-radius: 50%;"> <br> <strong>WangLing</strong> <br> <em>Desarrollador Full-Stack | Ingeniería de Sistemas</em> </p><p align="center"> <a href="https://github.com/wangling941"> <img src="https://img.shields.io/badge/GitHub-wangling941-181717?style=for-the-badge&logo=github" alt="GitHub"> </a> &nbsp; <a href="mailto:kevinvillegas.dev@gmail.com"> <img src="https://img.shields.io/badge/Email-Contacto-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"> </a> &nbsp; <a href="https://www.linkedin.com/in/kevin-villegas-solis-7b0038366/"> <img src="https://img.shields.io/badge/LinkedIn-Kevin%20Villegas%20Solis-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"> </a> </p>

### **📄 Licencia**

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

<p align="center"> Hecho con ❤️ para la gestión eficiente de recursos tecnológicos en el ámbito educativo. </p> ```
