// Gerenciamento de dados com localStorage
function carregarDados() {
  const dados = localStorage.getItem('transportadoras');
  if (dados) {
    return JSON.parse(dados);
  }
  return transportadoras;
}

function salvarDados(dados) {
  localStorage.setItem('transportadoras', JSON.stringify(dados));
}

// Função auxiliar para normalizar texto
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

let dadosTransportadoras = carregarDados();
let transportadoraEditando = null;
let cidadesTemp = [];
let configuracoesTemp = {
  fretes: {},
  prazos: {}
};

// Renderiza a lista de transportadoras
function renderizarLista() {
  const lista = document.getElementById('listaTransportadoras');
  lista.innerHTML = '';

  if (dadosTransportadoras.length === 0) {
    lista.innerHTML = '<p style="text-align: center; color: #999;">Nenhuma transportadora cadastrada</p>';
    return;
  }

  dadosTransportadoras.forEach((transportadora, index) => {
    const div = document.createElement('div');
    div.className = 'transportadora-item';

    const totalCidades = transportadora.cidades ? transportadora.cidades.length : 0;

    div.innerHTML = `
      <div class="transportadora-header">
        <h3>${transportadora.nome}</h3>
        <div class="transportadora-actions">
          <button onclick="editarTransportadora(${index})" class="btn btn-primary btn-small">✏️ Editar</button>
          <button onclick="excluirTransportadora(${index})" class="btn btn-danger btn-small">🗑️ Excluir</button>
        </div>
      </div>

      <div class="transportadora-info">
        <div class="info-item">
          <strong>📞 Telefone:</strong> ${transportadora.telefone}
        </div>
        <div class="info-item">
          <strong>💰 Frete Base:</strong> ${transportadora.freteBase || 'Não definido'}
        </div>
        <div class="info-item">
          <strong>⏱️ Prazo Base:</strong> ${transportadora.prazoBase || 'Não definido'}
        </div>
        <div class="info-item">
          <strong>🏙️ Cidades:</strong> ${totalCidades}
        </div>
      </div>

      ${totalCidades > 0 ? `
        <div>
          <strong>Cidades atendidas:</strong>
          <div class="cidades-tags">
            ${transportadora.cidades.map(cidade => `<span class="cidade-tag">${cidade}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    `;

    lista.appendChild(div);
  });
}

// Modal
function abrirModalNova() {
  transportadoraEditando = null;
  cidadesTemp = [];
  configuracoesTemp = { fretes: {}, prazos: {} };

  document.getElementById('modalTitulo').textContent = 'Nova Transportadora';
  document.getElementById('formTransportadora').reset();
  document.getElementById('listaCidades').innerHTML = '';
  document.getElementById('configuracaoAvancada').checked = false;
  document.getElementById('configuracaoAvancadaSection').style.display = 'none';
  document.getElementById('configCidadeForm').style.display = 'none';
  document.getElementById('configuracoesAtivas').innerHTML = '';

  document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

// Gerenciamento de cidades
function adicionarCidade() {
  const input = document.getElementById('novaCidade');
  const cidade = input.value.trim();

  if (!cidade) {
    alert('Digite o nome da cidade');
    return;
  }

  if (cidadesTemp.includes(cidade)) {
    alert('Esta cidade já foi adicionada');
    return;
  }

  cidadesTemp.push(cidade);
  atualizarListaCidades();
  atualizarSelectCidades();
  input.value = '';
}

function removerCidade(cidade) {
  cidadesTemp = cidadesTemp.filter(c => c !== cidade);

  // Remove configurações da cidade removida
  const cidadeNorm = normalizar(cidade);
  delete configuracoesTemp.fretes[cidadeNorm];
  delete configuracoesTemp.prazos[cidadeNorm];

  atualizarListaCidades();
  atualizarSelectCidades();
  atualizarConfiguracoesAtivas();
}

function atualizarListaCidades() {
  const lista = document.getElementById('listaCidades');
  lista.innerHTML = '';

  cidadesTemp.forEach(cidade => {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `
      ${cidade}
      <span class="remove" onclick="removerCidade('${cidade}')">×</span>
    `;
    lista.appendChild(tag);
  });
}

// Configuração avançada
function toggleConfiguracaoAvancada() {
  const checkbox = document.getElementById('configuracaoAvancada');
  const section = document.getElementById('configuracaoAvancadaSection');

  if (checkbox.checked) {
    if (cidadesTemp.length === 0) {
      alert('Adicione pelo menos uma cidade antes de configurar fretes específicos');
      checkbox.checked = false;
      return;
    }
    section.style.display = 'block';
    atualizarSelectCidades();
  } else {
    section.style.display = 'none';
  }
}

function atualizarSelectCidades() {
  const select = document.getElementById('cidadeParaConfigurar');
  select.innerHTML = '<option value="">Selecione uma cidade</option>';

  cidadesTemp.forEach(cidade => {
    const option = document.createElement('option');
    option.value = cidade;
    option.textContent = cidade;
    select.appendChild(option);
  });
}

function mostrarConfigCidade() {
  const select = document.getElementById('cidadeParaConfigurar');
  const cidade = select.value;
  const form = document.getElementById('configCidadeForm');

  if (!cidade) {
    form.style.display = 'none';
    return;
  }

  form.style.display = 'block';

  // Preenche com valores existentes se houver
  const cidadeNorm = normalizar(cidade);
  document.getElementById('freteCidade').value = configuracoesTemp.fretes[cidadeNorm] || '';
  document.getElementById('prazoCidade').value = configuracoesTemp.prazos[cidadeNorm] || '';
}

function salvarConfigCidade() {
  const cidade = document.getElementById('cidadeParaConfigurar').value;
  const frete = document.getElementById('freteCidade').value.trim();
  const prazo = document.getElementById('prazoCidade').value.trim();

  if (!cidade) {
    alert('Selecione uma cidade');
    return;
  }

  const cidadeNorm = normalizar(cidade);

  if (frete) {
    configuracoesTemp.fretes[cidadeNorm] = frete;
  }

  if (prazo) {
    configuracoesTemp.prazos[cidadeNorm] = prazo;
  }

  if (!frete && !prazo) {
    alert('Preencha pelo menos o frete ou o prazo');
    return;
  }

  atualizarConfiguracoesAtivas();

  // Limpa o formulário
  document.getElementById('cidadeParaConfigurar').value = '';
  document.getElementById('configCidadeForm').style.display = 'none';
  document.getElementById('freteCidade').value = '';
  document.getElementById('prazoCidade').value = '';

  alert('Configuração salva!');
}

function atualizarConfiguracoesAtivas() {
  const container = document.getElementById('configuracoesAtivas');
  container.innerHTML = '';

  const cidadesComConfig = new Set([
    ...Object.keys(configuracoesTemp.fretes),
    ...Object.keys(configuracoesTemp.prazos)
  ]);

  if (cidadesComConfig.size === 0) {
    return;
  }

  container.innerHTML = '<h3 style="margin: 20px 0 10px 0; font-size: 1.1em;">Configurações Específicas:</h3>';

  cidadesComConfig.forEach(cidadeNorm => {
    // Encontra o nome original da cidade
    const cidadeOriginal = cidadesTemp.find(c => normalizar(c) === cidadeNorm);
    const frete = configuracoesTemp.fretes[cidadeNorm];
    const prazo = configuracoesTemp.prazos[cidadeNorm];

    const div = document.createElement('div');
    div.className = 'config-item';
    div.innerHTML = `
      <div class="config-info">
        <strong>${cidadeOriginal}</strong>
        <span>
          ${frete ? `💰 ${frete}` : ''}
          ${frete && prazo ? ' • ' : ''}
          ${prazo ? `⏱️ ${prazo}` : ''}
        </span>
      </div>
      <button onclick="removerConfigCidade('${cidadeNorm}')" class="btn btn-danger btn-small">×</button>
    `;
    container.appendChild(div);
  });
}

function removerConfigCidade(cidadeNorm) {
  delete configuracoesTemp.fretes[cidadeNorm];
  delete configuracoesTemp.prazos[cidadeNorm];
  atualizarConfiguracoesAtivas();
}

// Salvar transportadora
function salvarTransportadora(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const freteBase = document.getElementById('freteBase').value.trim();
  const prazoBase = document.getElementById('prazoBase').value.trim();

  if (cidadesTemp.length === 0) {
    alert('Adicione pelo menos uma cidade');
    return;
  }

  const transportadora = {
    nome,
    telefone,
    freteBase,
    prazoBase,
    cidades: [...cidadesTemp]
  };

  // Adiciona configurações específicas se houver
  if (Object.keys(configuracoesTemp.fretes).length > 0) {
    transportadora.fretesPorCidade = { ...configuracoesTemp.fretes };
  }

  if (Object.keys(configuracoesTemp.prazos).length > 0) {
    transportadora.prazosPorCidade = { ...configuracoesTemp.prazos };
  }

  if (transportadoraEditando !== null) {
    dadosTransportadoras[transportadoraEditando] = transportadora;
  } else {
    dadosTransportadoras.push(transportadora);
  }

  salvarDados(dadosTransportadoras);
  renderizarLista();
  fecharModal();
}

// Editar transportadora
function editarTransportadora(index) {
  transportadoraEditando = index;
  const transportadora = dadosTransportadoras[index];

  document.getElementById('modalTitulo').textContent = 'Editar Transportadora';
  document.getElementById('nome').value = transportadora.nome;
  document.getElementById('telefone').value = transportadora.telefone;
  document.getElementById('freteBase').value = transportadora.freteBase || '';
  document.getElementById('prazoBase').value = transportadora.prazoBase || '';

  cidadesTemp = [...(transportadora.cidades || [])];
  atualizarListaCidades();

  // Carrega configurações específicas
  configuracoesTemp = {
    fretes: { ...(transportadora.fretesPorCidade || {}) },
    prazos: { ...(transportadora.prazosPorCidade || {}) }
  };

  const temConfiguracoes = Object.keys(configuracoesTemp.fretes).length > 0 ||
                          Object.keys(configuracoesTemp.prazos).length > 0;

  if (temConfiguracoes) {
    document.getElementById('configuracaoAvancada').checked = true;
    document.getElementById('configuracaoAvancadaSection').style.display = 'block';
    atualizarSelectCidades();
    atualizarConfiguracoesAtivas();
  }

  document.getElementById('modal').style.display = 'block';
}

// Excluir transportadora
function excluirTransportadora(index) {
  if (!confirm(`Deseja realmente excluir a transportadora "${dadosTransportadoras[index].nome}"?`)) {
    return;
  }

  dadosTransportadoras.splice(index, 1);
  salvarDados(dadosTransportadoras);
  renderizarLista();
}

// Resetar dados
function resetarDados() {
  if (!confirm('Isso irá restaurar os dados padrão e apagar todas as alterações. Deseja continuar?')) {
    return;
  }

  localStorage.removeItem('transportadoras');
  dadosTransportadoras = transportadoras;
  salvarDados(dadosTransportadoras);
  renderizarLista();
  alert('Dados restaurados com sucesso!');
}

// Fecha modal ao clicar fora
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    fecharModal();
  }
}

// Inicialização
renderizarLista();
