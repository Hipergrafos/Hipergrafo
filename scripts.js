const svg = d3.select("#canvas");
const selector = document.getElementById("selector");

Object.keys(hipergrafos).forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = hipergrafos[id].nombre;
    selector.appendChild(option);
});

selector.addEventListener("change", () => {
    dibujarHipergrafo(hipergrafos[selector.value]);
});

dibujarHipergrafo(hipergrafos[Object.keys(hipergrafos)[0]]);

function dibujarHipergrafo(hipergrafo) {
    svg.selectAll("*").remove();

    const ancho = 900;
    const alto = 500;
    const radio = 180;
    const cx = ancho / 2;
    const cy = alto / 2;

    const angulo = 2 * Math.PI / hipergrafo.nodos.length;

    const posiciones = {};

    hipergrafo.nodos.forEach((nodo, i) => {
        posiciones[nodo] = {
            x: cx + radio * Math.cos(i * angulo),
            y: cy + radio * Math.sin(i * angulo)
        };
    });

    // Hiperaristas (líneas simples)
    hipergrafo.hiperaristas.forEach(grupo => {
        for (let i = 0; i < grupo.length - 1; i++) {
            svg.append("line")
                .attr("x1", posiciones[grupo[i]].x)
                .attr("y1", posiciones[grupo[i]].y)
                .attr("x2", posiciones[grupo[i + 1]].x)
                .attr("y2", posiciones[grupo[i + 1]].y)
                .attr("stroke", "#38bdf8");
        }
    });

    // Nodos
    hipergrafo.nodos.forEach(nodo => {
        svg.append("circle")
            .attr("cx", posiciones[nodo].x)
            .attr("cy", posiciones[nodo].y)
            .attr("r", 18)
            .attr("fill", "#22d3ee");

        svg.append("text")
            .attr("x", posiciones[nodo].x)
            .attr("y", posiciones[nodo].y + 5)
            .attr("text-anchor", "middle")
            .attr("fill", "#020617")
            .text(nodo);
    });
}
