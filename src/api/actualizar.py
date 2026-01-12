def actualizar_atributos_nodo(hipergrafo, id_nodo, nuevos_atributos):
    """
    Actualiza los atributos de un nodo.
    """
    nodo = hipergrafo.nodos.get(id_nodo)
    if nodo is None:
        raise ValueError("El nodo no existe.")
    nodo.atributos.update(nuevos_atributos)


def actualizar_atributos_hiperarista(hipergrafo, id_hiperarista, nuevos_atributos):
    """
    Actualiza los atributos de una hiperarista.
    """
    h = hipergrafo.hiperaristas.get(id_hiperarista)
    if h is None:
        raise ValueError("La hiperarista no existe.")
    h.atributos.update(nuevos_atributos)
