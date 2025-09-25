// 📂 reportes.js

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "finanzas_app";
  const CATEGORIAS_KEY = "finanzas_categorias";

  const reporteMes = document.getElementById("reporteMes");
  const reporteTipo = document.getElementById("reporteTipo");
  const reporteCategoria = document.getElementById("reporteCategoria");
  const btnExportar = document.getElementById("btnExportar");
  const tablaReportes = document.getElementById("tablaReportes");

  function getTransacciones() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  function getCategorias() {
    return JSON.parse(localStorage.getItem(CATEGORIAS_KEY)) || [];
  }

  // ✅ Rellenar filtro de categorías
  function loadCategorias() {
    const categorias = getCategorias();
    reporteCategoria.innerHTML = `<option value="">Todas las categorías</option>`;
    categorias.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      reporteCategoria.appendChild(opt);
    });
  }

  // ✅ Filtrar transacciones según los criterios
  function filtrarTransacciones() {
    let transacciones = getTransacciones();

    if (reporteMes.value) {
      transacciones = transacciones.filter(t => t.date.startsWith(reporteMes.value));
    }

    if (reporteTipo.value) {
      transacciones = transacciones.filter(t => t.type === reporteTipo.value);
    }

    if (reporteCategoria.value) {
      transacciones = transacciones.filter(t => t.category === reporteCategoria.value);
    }

    renderTabla(transacciones);
  }

  // ✅ Renderizar tabla
  function renderTabla(data) {
    if (data.length === 0) {
      tablaReportes.innerHTML = `<p class="text-muted">No hay transacciones con los filtros seleccionados.</p>`;
      return;
    }

    let html = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
    `;

    data.forEach(t => {
      html += `
        <tr>
          <td>${t.title}</td>
          <td>${t.type}</td>
          <td>${t.category}</td>
          <td>S/. ${t.amount.toFixed(2)}</td>
          <td>${t.date}</td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    tablaReportes.innerHTML = html;
  }

  // ✅ Exportar CSV
  btnExportar.addEventListener("click", () => {
    const data = getTransacciones();
    let csv = "Descripción,Tipo,Categoría,Monto,Fecha\n";
    data.forEach(t => {
      csv += `${t.title},${t.type},${t.category},${t.amount},${t.date}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte_finanzas.csv";
    a.click();
  });

  // Eventos de filtrado
  reporteMes.addEventListener("change", filtrarTransacciones);
  reporteTipo.addEventListener("change", filtrarTransacciones);
  reporteCategoria.addEventListener("change", filtrarTransacciones);

  // Inicializar
  loadCategorias();
  filtrarTransacciones();
  document.getElementById("year").textContent = new Date().getFullYear();
});
