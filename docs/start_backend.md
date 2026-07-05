# 1. Levanta el servidor (desde la terminal, no desde VSCode)

Asegúrate de estar en la carpeta backend y con el entorno virtual activado:
powershell
cd D:\VScode\PROYECTOS\peripheral_detector\backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
