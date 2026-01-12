from src.Modelos.nodo import Nodo
from src.Modelos.hiperarista import Hiperarista


def insertar_nodo(hipergrafo, id_nodo, atributos=None):
    """
    Inserta un nuevo nodo en el hipergrafo.
    """
    nodo = Nodo(id_nodo, atributos)
    hipergrafo.agregar_nodo(nodo)
    return nodo


def insertar_hiperarista(hipergrafo, id_hiperarista, nodos, atributos=None):
    """
    Inserta una nueva hiperarista en el hipergrafo.
    """
    hiperarista = Hiperarista(id_hiperarista, nodos, atributos)
    hipergrafo.agregar_hiperarista(hiperarista)
    return hiperarista
