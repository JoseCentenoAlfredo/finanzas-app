const STORAGE_KEY = 'finanzas_app';

function getTransactions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTransactions(txns) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(txns));
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('transactionForm');
  const tbody = document.querySelector('#transactionsTable tbody');
  const saldoEl = document.getElementById('saldo');
  const ingresosEl = document.getElementById('ingresos');
  const gastosEl = document.getElementById('gastos');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  let transactions = getTransactions();
  renderAll();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    const data = new FormData(form);
    const txn = {
      id: Date.now().toString(),
      title: data.get('title'),
      type: data.get('type'),
      amount: parseFloat(data.get('amount')),
      category: data.get('category'),
      date: data.get('date')
    };
    transactions.push(txn);
    saveTransactions(transactions);
    addRow(txn);
    form.reset();
    form.classList.remove('was-validated');
    updateSummary();
  });

  function addRow(txn) {
    const tr = document.createElement('tr');
    tr.dataset.id = txn.id;
    tr.innerHTML = `
      <td>${txn.title}</td>
      <td>${txn.type}</td>
      <td>${txn.category}</td>
      <td>${txn.amount.toFixed(2)}</td>
      <td>${txn.date}</td>
      <td class="table-actions">
        <button class="btn btn-sm btn-outline-danger btn-delete">Eliminar</button>
      </td>
    `;
    tbody.prepend(tr);

    tr.querySelector('.btn-delete').addEventListener('click', () => {
      transactions = transactions.filter(t => t.id !== txn.id);
      saveTransactions(transactions);
      tr.remove();
      updateSummary();
    });
  }

  function renderAll() {
    tbody.innerHTML = '';
    transactions.slice().reverse().forEach(addRow);
    updateSummary();
  }

  function updateSummary() {
    let ingresos = 0, gastos = 0;
    transactions.forEach(t => {
      if (t.type === 'ingreso') ingresos += t.amount;
      else gastos += t.amount;
    });
    saldoEl.textContent = (ingresos - gastos).toFixed(2);
    ingresosEl.textContent = ingresos.toFixed(2);
    gastosEl.textContent = gastos.toFixed(2);
  }
});