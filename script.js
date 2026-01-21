const svg = d3.select("#canvas");
const selector = document.getElementById("selector");
const descripcion = document.getElementById("descripcion");

// Poblar el selector
Object.keys(hipergrafos).forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = hipergrafos[id].nombre;
    selector.appendChild(option);
});

// Evento de cambio
selector.addEventListener("change", () => {
    dibujarHipergrafo(hipergrafos[selector.value]);
});

// Dibujar el primero por defecto
dibujarHipergrafo(hipergrafos[Object.keys(hipergrafos)[0]]);

function dibujarHipergrafo(hipergrafo) {
    svg.selectAll("*").remove();
    descripcion.textContent = hipergrafo.nombre + " - Interactúa con los nodos y hiperaristas.";

    const ancho = 900;
    const alto = 500;
    const radio = 180;
    const cx = ancho / 2;
    const cy = alto / 2;

    const angulo = 2 * Math.PI / hipergrafo.nodos.length;
    const posiciones = {};

    // Calcular posiciones de nodos en círculo
    hipergrafo.nodos.forEach((nodo, i) => {
        posiciones[nodo] = {
            x: cx + radio * Math.cos(i * angulo - Math.PI / 2), // Ajuste para empezar arriba
            y: cy + radio * Math.sin(i * angulo - Math.PI / 2)
        };
    });

    // Dibujar hiperaristas como áreas sombreadas (polígonos curvos para mejor representación)
    hipergrafo.hiperaristas.forEach((hiperarista, index) => {
        const puntos = hiperarista.nodos.map(n => posiciones[n]);
        if (puntos.length > 2) {
            // Para hiperaristas con más de 2 nodos, dibujar un polígono
            const pathData = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveCardinalClosed)(puntos);

            svg.append("path")
                .attr("d", pathData)
                .attr("class", "hiperarista")
                .attr("fill", hiperarista.color)
                .attr("stroke", hiperarista.color)
                .style("opacity", 0)
                .transition()
                .duration(1000)
                .style("opacity", 1);
        } else {
            // Para 2 nodos, dibujar una línea curva
            const [p1, p2] = puntos;
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const controlX = midX + (Math.random() - 0.5) * 50; // Curva aleatoria para variedad
            const controlY = midY + (Math.random() - 0.5) * 50;

            svg.append("path")
                .attr("d", `M ${p1.x} ${p1.y} Q ${controlX} ${controlY} ${p2.x} ${p2.y}`)
                .attr("class", "hiperarista")
                .attr("fill", "none")
                .attr("stroke", hiperarista.color)
                .attr("stroke-width", 3)
                .style("opacity", 0)
                .transition()
                .duration(1000)
                .style("opacity", 1);
        }
    });

    // Dibujar nodos con animación
    const nodos = svg.selectAll(".nodo")
        .data(hipergrafo.nodos)
        .enter()
        .append("g")
        .attr("class", "nodo");

    nodos.append("circle")
        .attr("cx", d => posiciones[d].x)
        .attr("cy", d => posiciones[d].y)
        .attr("r", 0)
        .attr("fill", "#38bdf8")
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr("r", 20);

    nodos.append("text")
        .attr("x", d => posiciones[d].x)
        .attr("y", d => posiciones[d].y + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#020617")
        .style("opacity", 0)
        .text(d => d)
        .transition()
        .duration(800)
        .delay((d, i) => i * 200 + 400)
        .style("opacity", 1);
}