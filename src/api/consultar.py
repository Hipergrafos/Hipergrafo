def obtener_nodos(hipergrafo):
    """
    Devuelve todos los nodos del hipergrafo.
    """
    return hipergrafo.obtener_nodos()


def obtener_hiperaristas(hipergrafo):
    """
    Devuelve todas las hiperaristas del hipergrafo.
    """
    return hipergrafo.obtener_hiperaristas()


def obtener_nodo_por_id(hipergrafo, id_nodo):
    """
    Devuelve un nodo por su identificador.
    """
    return hipergrafo.nodos.get(id_nodo, None)


def hiperaristas_de_nodo(hipergrafo, id_nodo):
    """
    Devuelve las hiperaristas en las que participa un nodo.
    """
    resultado = []
    for h in hipergrafo.hiperaristas.values():
        if id_nodo in h.nodos:
            resultado.append(h)
    return resultado
