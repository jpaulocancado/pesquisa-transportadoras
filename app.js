// Função auxiliar para normalizar texto
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Gerenciamento de dados com localStorage
function carregarDados() {
  const dados = localStorage.getItem('transportadoras');
  if (dados) {
    return JSON.parse(dados);
  }
  // Se não tem dados no localStorage, usa os dados padrão
  return transportadoras;
}

function salvarDados(dados) {
  localStorage.setItem('transportadoras', JSON.stringify(dados));
}

// Inicializa os dados
let dadosTransportadoras = carregarDados();

// Elementos DOM
const filtroTransportadora = document.getElementById("filtroTransportadora");
const filtroCidade = document.getElementById("filtroCidade");
const resultado = document.getElementById("resultado");
const buscaCidade = document.getElementById("buscaCidade");
const sugestoesCidades = document.getElementById("sugestoesCidades");
const resultadoBusca = document.getElementById("resultadoBusca");

// ========== NOVA FUNCIONALIDADE: BUSCA POR CIDADE ==========

// Obtém todas as cidades únicas
function obterTodasCidades() {
  const cidadesSet = new Set();
  dadosTransportadoras.forEach(transportadora => {
    if (transportadora.cidades) {
      transportadora.cidades.forEach(cidade => {
        cidadesSet.add(cidade);
      });
    }
  });
  return Array.from(cidadesSet).sort();
}

// Busca transportadoras que atendem uma cidade
function buscarTransportadorasPorCidade(cidade) {
  const cidadeNorm = normalizar(cidade);
  return dadosTransportadoras.filter(transportadora => {
    if (!transportadora.cidades) return false;
    return transportadora.cidades.some(c =>
      normalizar(c).includes(cidadeNorm)
    );
  });
}

// Mostra sugestões de cidades
function mostrarSugestoes(texto) {
  if (!texto || texto.length < 2) {
    sugestoesCidades.classList.remove('show');
    return;
  }

  const todasCidades = obterTodasCidades();
  const cidadesFiltradas = todasCidades.filter(cidade =>
    normalizar(cidade).includes(normalizar(texto))
  ).slice(0, 10); // Limita a 10 sugestões

  if (cidadesFiltradas.length === 0) {
    sugestoesCidades.innerHTML = '<div class="sugestao-item">Nenhuma cidade encontrada</div>';
    sugestoesCidades.classList.add('show');
    return;
  }

  sugestoesCidades.innerHTML = cidadesFiltradas.map(cidade => {
    const transportadoras = buscarTransportadorasPorCidade(cidade);
    return `
      <div class="sugestao-item" data-cidade="${cidade}">
        <strong>${cidade}</strong>
        <span style="color: #888; font-size: 0.9em;"> - ${transportadoras.length} transportadora(s)</span>
      </div>
    `;
  }).join('');

  sugestoesCidades.classList.add('show');

  // Adiciona event listener para cada sugestão
  document.querySelectorAll('.sugestao-item').forEach(item => {
    item.addEventListener('click', function() {
      const cidade = this.getAttribute('data-cidade');
      if (cidade) {
        buscaCidade.value = cidade;
        sugestoesCidades.classList.remove('show');
        mostrarResultadoBusca(cidade);
      }
    });
  });
}

// Mostra resultado da busca
function mostrarResultadoBusca(cidade) {
  const transportadoras = buscarTransportadorasPorCidade(cidade);

  if (transportadoras.length === 0) {
    resultadoBusca.innerHTML = `
      <div class="no-results" style="color: #ff6b6b;">
        Nenhuma transportadora encontrada para "${cidade}"
      </div>
    `;
    return;
  }

  let html = `
    <div class="resultado-busca-titulo">
      📦 ${transportadoras.length} transportadora(s) encontrada(s) para <strong>${cidade}</strong>
    </div>
  `;

  transportadoras.forEach(transportadora => {
    const frete = calcularFrete(transportadora, cidade);
    const prazo = calcularPrazo(transportadora, cidade);
    const whatsappNumber = formatarTelefoneWhatsApp(transportadora.telefone);
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de solicitar um frete para ${cidade} com a ${transportadora.nome}.`
    );

    html += `
      <div class="transportadora-card">
        <h4>${transportadora.nome}</h4>

        <div class="info-row">
          <strong>📞 Telefone:</strong> ${transportadora.telefone}
        </div>

        <div class="info-row">
          <strong>💰 Frete:</strong> ${frete}
        </div>

        <div class="info-row">
          <strong>⏱️ Prazo:</strong> ${prazo}
        </div>

        <a
          href="https://wa.me/${whatsappNumber}?text=${mensagem}"
          target="_blank"
          class="whatsapp-btn"
        >
          <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Chamar no WhatsApp
        </a>
      </div>
    `;
  });

  resultadoBusca.innerHTML = html;
}

// Event listener para o campo de busca
buscaCidade.addEventListener('input', function() {
  mostrarSugestoes(this.value);

  // Limpa o resultado se o campo estiver vazio
  if (!this.value.trim()) {
    resultadoBusca.innerHTML = '';
  }
});

// Fecha as sugestões ao clicar fora
document.addEventListener('click', function(e) {
  if (!buscaCidade.contains(e.target) && !sugestoesCidades.contains(e.target)) {
    sugestoesCidades.classList.remove('show');
  }
});

// Permite buscar ao pressionar Enter
buscaCidade.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && this.value.trim()) {
    sugestoesCidades.classList.remove('show');
    mostrarResultadoBusca(this.value);
  }
});

// ========== FIM DA NOVA FUNCIONALIDADE ==========

// Popula o dropdown de transportadoras
function popularDropdown() {
  filtroTransportadora.innerHTML = '<option value="todas">Todas as transportadoras</option>';

  dadosTransportadoras.forEach((transportadora, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = transportadora.nome;
    filtroTransportadora.appendChild(option);
  });
}

// Formata telefone para WhatsApp (remove caracteres especiais)
function formatarTelefoneWhatsApp(telefone) {
  const numeroLimpo = telefone.replace(/\D/g, '');
  // Adiciona código do país se não tiver
  return numeroLimpo.startsWith('55') ? numeroLimpo : '55' + numeroLimpo;
}

// Calcula frete baseado na cidade
function calcularFrete(transportadora, cidade) {
  if (!cidade) {
    return transportadora.freteBase || "Sob consulta";
  }

  const cidadeNorm = normalizar(cidade);

  // Verifica se há frete específico para a cidade
  if (transportadora.fretesPorCidade && transportadora.fretesPorCidade[cidadeNorm]) {
    return transportadora.fretesPorCidade[cidadeNorm];
  }

  return transportadora.freteBase || "Sob consulta";
}

// Calcula prazo baseado na cidade
function calcularPrazo(transportadora, cidade) {
  if (!cidade) {
    return transportadora.prazoBase || "A consultar";
  }

  const cidadeNorm = normalizar(cidade);

  // Verifica se há prazo específico para a cidade
  if (transportadora.prazosPorCidade && transportadora.prazosPorCidade[cidadeNorm]) {
    return transportadora.prazosPorCidade[cidadeNorm];
  }

  return transportadora.prazoBase || "A consultar";
}

// Renderiza os cards de transportadoras
function renderizar() {
  resultado.innerHTML = "";

  const textoBusca = normalizar(filtroCidade.value);
  let resultadosEncontrados = 0;

  dadosTransportadoras.forEach((transportadora, index) => {
    // Filtro por transportadora selecionada
    if (
      filtroTransportadora.value !== "todas" &&
      Number(filtroTransportadora.value) !== index
    ) {
      return;
    }

    // Filtro por cidade
    let cidadesFiltradas = transportadora.cidades || [];
    let cidadeSelecionada = null;

    if (textoBusca) {
      cidadesFiltradas = cidadesFiltradas.filter(cidade =>
        normalizar(cidade).includes(textoBusca)
      );

      // Se não encontrou nenhuma cidade, não mostra a transportadora
      if (cidadesFiltradas.length === 0) {
        return;
      }

      // Pega a primeira cidade encontrada para cálculos
      cidadeSelecionada = cidadesFiltradas[0];
    }

    resultadosEncontrados++;

    // Calcula frete e prazo
    const frete = calcularFrete(transportadora, cidadeSelecionada);
    const prazo = calcularPrazo(transportadora, cidadeSelecionada);

    // Cria o card
    const card = document.createElement("div");
    card.className = "card";

    const whatsappNumber = formatarTelefoneWhatsApp(transportadora.telefone);
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de solicitar um frete com a ${transportadora.nome}.`
    );

    card.innerHTML = `
      <h3>${transportadora.nome}</h3>

      <div class="info-row">
        <strong>📞 Telefone:</strong> ${transportadora.telefone}
      </div>

      <div class="info-row">
        <strong>💰 Frete:</strong> ${frete}
      </div>

      <div class="info-row">
        <strong>⏱️ Prazo:</strong> ${prazo}
      </div>

      <a
        href="https://wa.me/${whatsappNumber}?text=${mensagem}"
        target="_blank"
        class="whatsapp-btn"
      >
        <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Chamar no WhatsApp
      </a>

      <div class="cidades-section">
        <strong>Cidades atendidas (${cidadesFiltradas.length}):</strong>
        <ul class="cidades-list">
          ${cidadesFiltradas.map(cidade => `<li>${cidade}</li>`).join("")}
        </ul>
      </div>
    `;

    resultado.appendChild(card);
  });

  // Mostra mensagem se não encontrou resultados
  if (resultadosEncontrados === 0) {
    resultado.innerHTML = `
      <div class="no-results">
        Nenhuma transportadora encontrada para "${filtroCidade.value}"
      </div>
    `;
  }
}

// Event listeners
filtroTransportadora.addEventListener("change", renderizar);
filtroCidade.addEventListener("input", renderizar);

// Inicialização
popularDropdown();
renderizar();
