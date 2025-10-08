const apiBaseUrl = 'http://localhost:8080'; // ajuste a URL da sua API aqui

const tabelaCorpo = document.querySelector('#tabelaAcervos tbody');
const loadingEl = document.getElementById('loading');
const inputBusca = document.getElementById('inputBusca');
const btnBuscar = document.getElementById('btnBuscar');
const btnLimpar = document.getElementById('btnLimpar');

async function carregarAcervos() {
  mostrarLoading(true);
  try {
    const res = await fetch(`${apiBaseUrl}/acervos`);
    if (!res.ok) throw new Error('Erro ao carregar acervos');
    const dados = await res.json();
    mostrarAcervos(dados);
  } catch (err) {
    alert(err.message);
  } finally {
    mostrarLoading(false);
  }
}

async function buscarPorTitulo(titulo) {
  mostrarLoading(true);
  try {
    const url = `${apiBaseUrl}/acervos/buscar?titulo=${encodeURIComponent(titulo)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Erro ao buscar acervos');
    const dados = await res.json();
    mostrarAcervos(dados);
  } catch (err) {
    alert(err.message);
  } finally {
    mostrarLoading(false);
  }
}

function mostrarAcervos(acervos) {
  tabelaCorpo.innerHTML = '';
  if (acervos.length === 0) {
    tabelaCorpo.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum item encontrado</td></tr>`;
    return;
  }

  for (const item of acervos) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.titulo}</td>
      <td>${item.autor}</td>
      <td>${item.tipo}</td>
      <td>${item.status}</td>
    `;
    tabelaCorpo.appendChild(tr);
  }
}

function mostrarLoading(show) {
  loadingEl.style.display = show ? 'block' : 'none';
}

// eventos
btnBuscar.addEventListener('click', () => {
  const titulo = inputBusca.value.trim();
  if (titulo === '') {
    alert('Digite um título para buscar');
    return;
  }
  buscarPorTitulo(titulo);
});

btnLimpar.addEventListener('click', () => {
  inputBusca.value = '';
  carregarAcervos();
});

// carregamento inicial
carregarAcervos();
