// 📂 categorias.js

document.addEventListener("DOMContentLoaded", () => {
  const listaCategorias = document.getElementById("listaCategorias");
  const formCategoria = document.getElementById("formCategoria");
  const nuevaCategoria = document.getElementById("nuevaCategoria");
  const STORAGE_KEY = "finanzas_categorias";

  // ✅ Obtener categorías almacenadas
  function getCategorias() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  // ✅ Guardar categorías
  function saveCategorias(categorias) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categorias));
  }

  // ✅ Renderizar lista de categorías
  function renderCategorias() {
    const categorias = getCategorias();
    listaCategorias.innerHTML = "";

    if (categorias.length === 0) {
      listaCategorias.innerHTML = `<li class="list-group-item text-muted">No hay categorías registradas.</li>`;
      return;
    }

    categorias.forEach((cat, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${cat}
        <button class="btn btn-sm btn-danger" data-index="${index}">Eliminar</button>
      `;
      listaCategorias.appendChild(li);
    });

    // Eliminar categoría
    document.querySelectorAll("button[data-index]").forEach(btn => {
      btn.addEventListener("click", e => {
        const categorias = getCategorias();
        categorias.splice(e.target.dataset.index, 1);
        saveCategorias(categorias);
        renderCategorias();
      });
    });
  }

  // ✅ Agregar nueva categoría
  formCategoria.addEventListener("submit", e => {
    e.preventDefault();
    const categoria = nuevaCategoria.value.trim();
    if (categoria === "") return;

    const categorias = getCategorias();
    if (!categorias.includes(categoria)) {
      categorias.push(categoria);
      saveCategorias(categorias);
      nuevaCategoria.value = "";
      renderCategorias();
    } else {
      alert("Esta categoría ya existe.");
    }
  });

  // Inicializar
  renderCategorias();
  document.getElementById("year").textContent = new Date().getFullYear();
});
