from src.Modelos.hipergrafo import Hipergrafo
from src.api.insertar import insertar_nodo, insertar_hiperarista
from src.api.consultar import obtener_nodos

h = Hipergrafo("H1")

insertar_nodo(h, "A")
insertar_nodo(h, "B")
insertar_hiperarista(h, "E1", ["A", "B"])

print(obtener_nodos(h))
