class Hiperarista:
    """
    Representa una hiperarista que conecta múltiples nodos.
    """

    def __init__(self, id_hiperarista, nodos, atributos=None):
        """
        Inicializa una hiperarista.

        :param id_hiperarista: Identificador único de la hiperarista
        :param nodos: Conjunto o lista de identificadores de nodos
        :param atributos: Diccionario opcional de atributos
        """
        if len(nodos) < 2:
            raise ValueError("Una hiperarista debe conectar al menos dos nodos.")

        self.id = id_hiperarista
        self.nodos = set(nodos)
        self.atributos = atributos if atributos is not None else {}

    def __repr__(self):
        return f"Hiperarista(id={self.id}, nodos={list(self.nodos)})"
