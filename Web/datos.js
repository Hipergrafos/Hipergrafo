// datos.js
// Datos de hipergrafos (corregidos y expandidos para mejor representación)
const hipergrafos = {
    H1: {
        nombre: "Hipergrafo 1: Conjunto Básico",
        nodos: ["A", "B", "C", "D"],
        hiperaristas: [
            { nodos: ["A", "B", "C"], color: "#38bdf8" },
            { nodos: ["C", "D"], color: "#22d3ee" }
        ]
    },
    H2: {
        nombre: "Hipergrafo 2: Triángulo Completo",
        nodos: ["X", "Y", "Z"],
        hiperaristas: [
            { nodos: ["X", "Y"], color: "#38bdf8" },
            { nodos: ["Y", "Z"], color: "#22d3ee" },
            { nodos: ["X", "Z"], color: "#0ea5e9" }
        ]
    },
    H3: {
        nombre: "Hipergrafo 3: Estrella",
        nodos: ["Centro", "P1", "P2", "P3", "P4"],
        hiperaristas: [
            { nodos: ["Centro", "P1", "P2"], color: "#38bdf8" },
            { nodos: ["Centro", "P3", "P4"], color: "#22d3ee" }
        ]
    }
};