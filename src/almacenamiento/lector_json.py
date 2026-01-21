import json
from src.Modelos.hipergrafo import Hipergrafo
from src.Modelos.nodo import Nodo
from src.Modelos.hiperarista import Hiperarista


def cargar_hipergrafo_desde_json(ruta):
    """
    Carga un hipergrafo desde un archivo JSON.

    Formato esperado (recomendado):
    {
        "id": "H1",
        "descripcion": "Ejemplo",
        "nodos": [
            { "id": "A", "atributos": {} },
            { "id": "B" }
        ],
        "hiperaristas": [
            {
                "id": "E1",
                "nodos": ["A", "B"],
                "atributos": {}
            }
        ]
    }

    También acepta nodos como strings:
    "nodos": ["A", "B", "C"]
    """

    # ---------- Leer archivo ----------
    with open(ruta, "r", encoding="utf-8") as f:
        data = json.load(f)

    # ---------- Validaciones básicas ----------
    if "id" not in data:
        raise ValueError("El JSON debe contener un campo 'id' para el hipergrafo")

    if "nodos" not in data or not isinstance(data["nodos"], list):
        raise ValueError("El campo 'nodos' debe existir y ser una lista")

    if "hiperaristas" not in data or not isinstance(data["hiperaristas"], list):
        raise ValueError("El campo 'hiperaristas' debe existir y ser una lista")

    # ---------- Crear hipergrafo ----------
    h = Hipergrafo(
        data["id"],
        data.get("descripcion", "")
    )

    # ---------- Cargar nodos ----------
    ids_nodos = set()

    for n in data["nodos"]:
        # Caso 1: nodo como string
        if isinstance(n, str):
            nodo = Nodo(n, {})
            ids_nodos.add(n)

        # Caso 2: nodo como diccionario
        elif isinstance(n, dict):
            if "id" not in n:
                raise ValueError("Cada nodo debe tener un campo 'id'")

            nodo = Nodo(
                n["id"],
                n.get("atributos", {})
            )
            ids_nodos.add(n["id"])

        else:
            raise TypeError("Los nodos deben ser strings o diccionarios")

        h.agregar_nodo(nodo)

    # ---------- Cargar hiperaristas ----------
    for e in data["hiperaristas"]:
        if "id" not in e or "nodos" not in e:
            raise ValueError("Cada hiperarista debe tener 'id' y 'nodos'")

        if not isinstance(e["nodos"], list):
            raise TypeError("El campo 'nodos' de una hiperarista debe ser una lista")

        # Validar que los nodos existan
        for nid in e["nodos"]:
            if nid not in ids_nodos:
                raise ValueError(
                    f"La hiperarista '{e['id']}' referencia un nodo inexistente: {nid}"
                )

        hiperarista = Hiperarista(
            e["id"],
            e["nodos"],
            e.get("atributos", {})
        )

        h.agregar_hiperarista(hiperarista)

    return h
