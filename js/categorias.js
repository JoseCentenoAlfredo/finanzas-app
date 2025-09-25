// categorias.js
const CATEGORIES_KEY = "finanzas_categorias";

// Guardar categorías
function saveCategories(categories) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

// Obtener categorías
function getCategories() {
  return JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
}

// Ejemplo de uso al agregar una nueva
document.getElementById("formCategoria").addEventListener("submit", (e) => {
  e.preventDefault();
  const nueva = document.getElementById("nuevaCategoria").value.trim();
  if (nueva) {
    const categorias = getCategories();
    categorias.push(nueva);
    saveCategories(categorias);
    renderCategorias();
    e.target.reset();
  }
});

// Renderizar en la página de categorías
function renderCategorias() {
  const lista = document.getElementById("listaCategorias");
  lista.innerHTML = "";
  getCategories().forEach(cat => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = cat;
    lista.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", renderCategorias);
