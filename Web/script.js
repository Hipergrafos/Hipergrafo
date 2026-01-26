const svg = d3.select("#canvas");
const selector = document.getElementById("selector");
const descripcion = document.getElementById("descripcion");

// 🔹 RUTA CORRECTA A DATA (desde /web)
const BASE_DATA = "../data/ejemplos/";

async function cargarIndice() {
    const res = await fetch(`${BASE_DATA}index.json`);
    return await res.json();
}

async function cargarHipergrafo(archivo) {
    const res = await fetch(`${BASE_DATA}${archivo}`);
    return await res.json();
}

document.addEventListener("DOMContentLoaded", async () => {
    const indice = await cargarIndice();

    indice.forEach((h, i) => {
        const li = document.createElement("li");
        li.textContent = h.nombre;
        li.dataset.archivo = h.archivo;

        if (i === 0) li.classList.add("selected");

        li.addEventListener("click", async () => {
            document.querySelectorAll("#selector li")
                .forEach(x => x.classList.remove("selected"));

            li.classList.add("selected");
            const hipergrafo = await cargarHipergrafo(h.archivo);
            dibujarHipergrafo(hipergrafo);
        });

        selector.appendChild(li);
    });

    if (indice.length > 0) {
        const hipergrafo = await cargarHipergrafo(indice[0].archivo);
        dibujarHipergrafo(hipergrafo);
    }
});

function dibujarHipergrafo(hipergrafo) {
    svg.selectAll("*").remove();
    descripcion.textContent = hipergrafo.descripcion || "";

    const ancho = 900, alto = 500;
    const radio = 180;
    const cx = ancho / 2;
    const cy = alto / 2;

    // 🔹 EXTRAER IDs DE NODOS
    const nodosIds = hipergrafo.nodos.map(n => n.id);
    const angulo = 2 * Math.PI / nodosIds.length;
    const posiciones = {};

    nodosIds.forEach((id, i) => {
        posiciones[id] = {
            x: cx + radio * Math.cos(i * angulo - Math.PI / 2),
            y: cy + radio * Math.sin(i * angulo - Math.PI / 2)
        };
    });

    // 🔹 DIBUJAR HIPERARISTAS
    hipergrafo.hiperaristas.forEach(e => {
        const puntos = e.nodos.map(n => posiciones[n]);
        const color = e.color || "#22d3ee";

        if (puntos.length > 2) {
            const path = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveCardinalClosed)(puntos);

            svg.append("path")
                .attr("d", path)
                .attr("fill", color)
                .attr("stroke", color)
                .attr("class", "hiperarista")
                .style("opacity", 0)
                .transition()
                .duration(800)
                .style("opacity", 0.4);
        } else {
            const [p1, p2] = puntos;
            svg.append("line")
                .attr("x1", p1.x)
                .attr("y1", p1.y)
                .attr("x2", p2.x)
                .attr("y2", p2.y)
                .attr("stroke", color)
                .attr("stroke-width", 3);
        }
    });

    // 🔹 DIBUJAR NODOS
    const nodos = svg.selectAll(".nodo")
        .data(nodosIds)
        .enter()
        .append("g")
        .attr("class", "nodo");

    nodos.append("circle")
        .attr("cx", d => posiciones[d].x)
        .attr("cy", d => posiciones[d].y)
        .attr("r", 20)
        .attr("fill", "#38bdf8");

    nodos.append("text")
        .attr("x", d => posiciones[d].x)
        .attr("y", d => posiciones[d].y + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#020617")
        .style("font-weight", "bold")
        .text(d => d);
}