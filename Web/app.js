// ===============================
// NORMALIZAR HIPERGRAFO
// ===============================
function normalizeHypergraph(data) {
  return {
    meta: data.meta || {},
    nodes: (data.nodes || data.nodos || []).map(n =>
      typeof n === 'string' ? { id: n, tipo: 'desconocido' } : n
    ),
    hyperedges: (data.hyperedges || data.hiperaristas || []).map(h => ({
      id: h.id || h.label,
      label: h.label || h.id,
      tipo: h.tipo || 'general',
      peso: h.peso || 1,
      nodes: h.nodes || h.nodos || []
    }))
  };
}

// ===============================
// PESTAÑAS
// ===============================
function showTab(tabId, event) {
  document.querySelectorAll('.tab-content')
    .forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');

  document.querySelectorAll('.tab-button')
    .forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  if (tabId === 'visualizar') loadSavedHypergraphs();
}


function loadSavedHypergraphs() {
  const ul = document.getElementById('lista-guardados');
  ul.innerHTML = '';

  const saved = JSON.parse(localStorage.getItem('hypergraphs') || '[]');
  saved.forEach(hg => {
    const li = document.createElement('li');
    li.textContent = hg.name;
    li.onclick = () => visualizeHypergraph(hg);
    ul.appendChild(li);
  });
}

function visualizeHypergraph(hg) {
  const data = normalizeHypergraph(hg.data);
  renderHypergraph(data, 'canvas');
  document.getElementById('info').textContent =
    hg.description || data.meta.descripcion || 'Sin descripción';
}

// ===============================
// RENDER CON FORCE LAYOUT
// ===============================
function renderHypergraph(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const width = 700;
  const height = 450;

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Colores
  const nodeColor = d => {
    if (d.tipo === 'investigador') return '#28a745';
    if (d.tipo === 'proyecto') return '#6f42c1';
    return '#6c757d';
  };

  const edgeColor = d =>
    d.tipo === 'financiamiento'
      ? 'rgba(255,193,7,0.35)'
      : 'rgba(0,123,255,0.35)';

  // Fuerza
  const simulation = d3.forceSimulation(data.nodes)
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(45));

  // Hipararistas (polígonos)
  const edgeGroup = svg.append('g');

  function drawEdges() {
    edgeGroup.selectAll('*').remove();

    data.hyperedges.forEach(edge => {
      const points = edge.nodes
        .map(id => data.nodes.find(n => n.id === id))
        .filter(Boolean);

      if (points.length > 1) {
        const hull = d3.polygonHull(points.map(p => [p.x, p.y]));
        if (!hull) return;

        edgeGroup.append('path')
          .attr('d', d3.line().curve(d3.curveCardinalClosed)(hull))
          .attr('fill', edgeColor(edge))
          .attr('stroke', '#333')
          .attr('stroke-width', edge.peso);

        const [cx, cy] = d3.polygonCentroid(hull);
        edgeGroup.append('text')
          .attr('x', cx)
          .attr('y', cy)
          .attr('text-anchor', 'middle')
          .attr('font-size', 12)
          .attr('fill', '#000')
          .text(edge.label);
      }
    });
  }

  // Nodos
  const node = svg.append('g')
    .selectAll('circle')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('r', 20)
    .attr('fill', nodeColor)
    .call(
      d3.drag()
        .on('start', dragStart)
        .on('drag', dragged)
        .on('end', dragEnd)
    );

  // Etiquetas
  const labels = svg.append('g')
    .selectAll('text')
    .data(data.nodes)
    .enter()
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', 11)
    .text(d => d.label || d.id);

  // Tooltips
  node.append('title')
    .text(d => `${d.id}\nTipo: ${d.tipo}`);

  simulation.on('tick', () => {
    drawEdges();

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    labels
      .attr('x', d => d.x)
      .attr('y', d => d.y + 4);
  });

  function dragStart(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnd(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

// ===============================
// EVENTOS DOM
// ===============================
document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('importar').addEventListener('change', e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = ev => {
      const raw = JSON.parse(ev.target.result);
      const data = normalizeHypergraph(raw);
      document.getElementById('preview-placeholder').style.display = 'none';
      renderHypergraph(data, 'preview-svg');
    };

    reader.readAsText(file);
  });

  document.getElementById('guardar-btn').addEventListener('click', () => {
    const file = document.getElementById('importar').files[0];
    const desc = document.getElementById('descripcion-input').value;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const saved = JSON.parse(localStorage.getItem('hypergraphs') || '[]');
      saved.push({
        name: prompt('Nombre del hipergrafo'),
        data: JSON.parse(e.target.result),
        description: desc
      });
      localStorage.setItem('hypergraphs', JSON.stringify(saved));
      alert('Guardado ✔');
    };
    reader.readAsText(file);
  });

  loadSavedHypergraphs();
});