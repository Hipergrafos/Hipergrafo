from src.Modelos.nodo import Nodo
from src.Modelos.hiperarista import Hiperarista
from src.Modelos.hipergrafo import Hipergrafo

h = Hipergrafo("H1", "Ejemplo")

h.agregar_nodo(Nodo("A"))
h.agregar_nodo(Nodo("B"))
h.agregar_nodo(Nodo("C"))

e1 = Hiperarista("E1", ["A", "B", "C"])
h.agregar_hiperarista(e1)

print(h)
