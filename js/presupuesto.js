// 📂 presupuesto.js

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "finanzas_metas";
  const formPresupuesto = document.getElementById("formPresupuesto");
  const metaNombre = document.getElementById("metaNombre");
  const metaMonto = document.getElementById("metaMonto");
  const listaMetas = document.getElementById("listaMetas");

  function getMetas() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  function saveMetas(metas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
  }

  // ✅ Renderizar metas
  function renderMetas() {
    const metas = getMetas();
    listaMetas.innerHTML = "";

    if (metas.length === 0) {
      listaMetas.innerHTML = `<li class="list-group-item text-muted">No hay metas definidas.</li>`;
      return;
    }

    metas.forEach((m, i) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <div>
          <strong>${m.nombre}</strong> - Meta: S/. ${m.monto.toFixed(2)}
        </div>
        <button class="btn btn-sm btn-danger" data-index="${i}">Eliminar</button>
      `;
      listaMetas.appendChild(li);
    });

    // Eliminar meta
    document.querySelectorAll("button[data-index]").forEach(btn => {
      btn.addEventListener("click", e => {
        const metas = getMetas();
        metas.splice(e.target.dataset.index, 1);
        saveMetas(metas);
        renderMetas();
      });
    });
  }

  // ✅ Agregar nueva meta
  formPresupuesto.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = metaNombre.value.trim();
    const monto = parseFloat(metaMonto.value);

    if (nombre && monto > 0) {
      const metas = getMetas();
      metas.push({ nombre, monto });
      saveMetas(metas);
      metaNombre.value = "";
      metaMonto.value = "";
      renderMetas();
    }
  });

  // Inicializar
  renderMetas();
  document.getElementById("year").textContent = new Date().getFullYear();
});
