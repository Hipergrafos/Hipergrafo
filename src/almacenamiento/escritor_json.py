import json


def guardar_hipergrafo_a_json(hipergrafo, ruta):
    data = {
        "id": hipergrafo.id,
        "descripcion": hipergrafo.descripcion,
        "nodos": [
            {"id": n.id, "atributos": n.atributos}
            for n in hipergrafo.nodos.values()
        ],
        "hiperaristas": [
            {
                "id": e.id,
                "nodos": e.nodos,
                "atributos": e.atributos
            }
            for e in hipergrafo.hiperaristas.values()
        ]
    }

    with open(ruta, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
