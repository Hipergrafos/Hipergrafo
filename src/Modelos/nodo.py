class Nodo:
    """
    Representa un nodo dentro de un hipergrafo.
    """

    def __init__(self, id_nodo, atributos=None):
        """
        Inicializa un nodo.

        :param id_nodo: Identificador único del nodo
        :param atributos: Diccionario opcional de atributos
        """
        self.id = id_nodo
        self.atributos = atributos if atributos is not None else {}

    def __repr__(self):
        return f"Nodo(id={self.id}, atributos={self.atributos})"
