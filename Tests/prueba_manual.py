from src.almacenamiento.lector_json import cargar_hipergrafo_desde_json

ruta = "data/ejemplos/colaboracion_academica.json"
h = cargar_hipergrafo_desde_json(ruta)

print("ID:", h.id)
print("Nodos:", list(h.nodos.keys()))
print("Hiperaristas:", list(h.hiperaristas.keys()))
