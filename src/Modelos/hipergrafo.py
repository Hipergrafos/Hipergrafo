from .nodo import Nodo
from .hiperarista import Hiperarista


class Hipergrafo:
    """
    Representa un hipergrafo compuesto por nodos y hiperaristas.
    """

    def __init__(self, id_hipergrafo, descripcion="", metadatos=None):
        """
        Inicializa un hipergrafo.

        :param id_hipergrafo: Identificador único del hipergrafo
        :param descripcion: Descripción del hipergrafo
        :param metadatos: Diccionario con metadatos (autor, fecha, versión, etc.)
        """
        self.id = id_hipergrafo
        self.descripcion = descripcion
        self.metadatos = metadatos if metadatos is not None else {}

        self.nodos = {}
        self.hiperaristas = {}

    # -----------------------------
    # Gestión de nodos
    # -----------------------------

    def agregar_nodo(self, nodo):
        if nodo.id in self.nodos:
            raise ValueError(f"El nodo '{nodo.id}' ya existe.")
        self.nodos[nodo.id] = nodo

    def eliminar_nodo(self, id_nodo):
        if id_nodo not in self.nodos:
            raise ValueError(f"El nodo '{id_nodo}' no existe.")

        # Eliminar el nodo de las hiperaristas
        for h in self.hiperaristas.values():
            if id_nodo in h.nodos:
                h.nodos.remove(id_nodo)

        del self.nodos[id_nodo]

    # -----------------------------
    # Gestión de hiperaristas
    # -----------------------------

    def agregar_hiperarista(self, hiperarista):
        if hiperarista.id in self.hiperaristas:
            raise ValueError(f"La hiperarista '{hiperarista.id}' ya existe.")

        # Verificar que los nodos existan
        for id_nodo in hiperarista.nodos:
            if id_nodo not in self.nodos:
                raise ValueError(f"El nodo '{id_nodo}' no existe en el hipergrafo.")

        self.hiperaristas[hiperarista.id] = hiperarista

    def eliminar_hiperarista(self, id_hiperarista):
        if id_hiperarista not in self.hiperaristas:
            raise ValueError(f"La hiperarista '{id_hiperarista}' no existe.")

        del self.hiperaristas[id_hiperarista]

    # -----------------------------
    # Consultas
    # -----------------------------

    def obtener_nodos(self):
        return list(self.nodos.values())

    def obtener_hiperaristas(self):
        return list(self.hiperaristas.values())

    def __repr__(self):
        return (
            f"Hipergrafo(id={self.id}, "
            f"nodos={len(self.nodos)}, "
            f"hiperaristas={len(self.hiperaristas)})"
        )
