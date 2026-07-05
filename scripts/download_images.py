import os
import requests
import time
import random
import hashlib
from ddgs import DDGS
from PIL import Image
from io import BytesIO

def image_hash(content):
    """Calcula hash SHA256 del contenido de la imagen para detectar duplicados."""
    return hashlib.sha256(content).hexdigest()

def is_valid_image(content, min_size=(100, 100), max_ratio=3.0):
    """Verifica que la imagen tenga tamaño mínimo y no sea excesivamente alargada."""
    try:
        img = Image.open(BytesIO(content))
        w, h = img.size
        if w < min_size[0] or h < min_size[1]:
            return False, "tamaño pequeño"
        if max(w, h) / min(w, h) > max_ratio:
            return False, "proporción extrema"
        # Detectar marcas de agua simples (opcional)
        # Podríamos analizar bordes o textura, pero por simplicidad lo dejamos.
        return True, "ok"
    except Exception:
        return False, "corrupta"

def download_images(keyword, limit, output_dir, delay_range=(3, 7)):
    """Descarga imágenes con filtros de calidad y evita duplicados."""
    os.makedirs(output_dir, exist_ok=True)
    count = 0
    seen_hashes = set()
    
    with DDGS() as ddgs:
        # Pedir más de las necesarias para compensar filtros
        results = list(ddgs.images(keyword, max_results=limit * 2))
        print(f"🔍 Encontradas {len(results)} imágenes para '{keyword}'")
        
        for result in results:
            if count >= limit:
                break
            try:
                img_url = result.get('image') or result.get('url')
                if not img_url:
                    continue
                
                # Descargar
                response = requests.get(img_url, timeout=15)
                if response.status_code != 200:
                    print(f"⚠️ Error {response.status_code} para {img_url}")
                    continue
                
                content = response.content
                if not content:
                    continue
                
                # Detectar duplicados
                h = image_hash(content)
                if h in seen_hashes:
                    print(f"⏭️ Duplicado omitido: {img_url}")
                    continue
                seen_hashes.add(h)
                
                # Validar calidad
                valid, reason = is_valid_image(content)
                if not valid:
                    print(f"⏭️ Imagen no válida ({reason}): {img_url}")
                    continue
                
                # Guardar
                ext = img_url.split('.')[-1].split('?')[0]
                if ext.lower() not in ['jpg', 'jpeg', 'png', 'webp']:
                    ext = 'jpg'
                filename = f"{keyword.replace(' ', '_')}_{count}.{ext}"
                filepath = os.path.join(output_dir, filename)
                with open(filepath, 'wb') as f:
                    f.write(content)
                count += 1
                print(f"✅ Descargada {count}: {filename}")
                
            except Exception as e:
                print(f"❌ Error con {img_url}: {e}")
            
            # Pausa aleatoria para evitar rate limiting
            time.sleep(random.uniform(delay_range[0], delay_range[1]))
    
    print(f"📊 Descargadas {count} imágenes válidas para '{keyword}'")

if __name__ == "__main__":
    # Palabras clave más específicas y variadas
    download_images("monitor de computadora pantalla plana", 300, "data/raw/monitor")
    download_images("laptop portátil notebook", 300, "data/raw/laptop")
    download_images("torre PC computadora escritorio", 300, "data/raw/desktop")