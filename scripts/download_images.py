import os
import requests
import time
import random
from ddgs import DDGS

def download_images(keyword, limit, output_dir, delay_range=(2, 5)):
    """Descarga imágenes con pausas aleatorias para evitar rate limiting."""
    os.makedirs(output_dir, exist_ok=True)
    count = 0
    with DDGS() as ddgs:
        # Obtener resultados
        results = list(ddgs.images(keyword, max_results=limit))
        print(f"🔍 Encontradas {len(results)} imágenes para '{keyword}'")
        
        for result in results:
            try:
                img_url = result.get('image') or result.get('url')
                if not img_url:
                    continue
                # Descargar con timeout
                response = requests.get(img_url, timeout=15)
                if response.status_code == 200:
                    ext = img_url.split('.')[-1].split('?')[0]
                    if ext.lower() not in ['jpg', 'jpeg', 'png', 'webp']:
                        ext = 'jpg'
                    filename = f"{keyword.replace(' ', '_')}_{count}.{ext}"
                    filepath = os.path.join(output_dir, filename)
                    with open(filepath, 'wb') as f:
                        f.write(response.content)
                    count += 1
                    print(f"✅ Descargada {count}: {filename}")
                else:
                    print(f"⚠️ Error {response.status_code} para {img_url}")
                # Pausa aleatoria para evitar rate limiting
                delay = random.uniform(delay_range[0], delay_range[1])
                time.sleep(delay)
            except Exception as e:
                print(f"❌ Error con {img_url}: {e}")
            if count >= limit:
                break
    print(f"📊 Descargadas {count} imágenes para '{keyword}'")

if __name__ == "__main__":
    # Palabras clave optimizadas (más específicas)
    download_images("monitor de computadora pantalla", 200, "data/raw/monitor", delay_range=(3, 6))
    download_images("laptop portátil notebook", 200, "data/raw/laptop", delay_range=(3, 6))
    download_images("torre PC computadora escritorio", 200, "data/raw/desktop", delay_range=(3, 6))