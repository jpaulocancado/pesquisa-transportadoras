/* data.js - BASE DE TRANSPORTADORAS */

const transportadoras = [
  {
    nome: "MOOVI CELULAR",
    telefone: "34991478153",
    cidades: ["Uberlandia"],
    calcularFrete: () => "R$ 35,00",
    calcularPrazo: () => "24 horas"
  },

  {
    nome: "LR CARVALHO",
    telefone: "3498688259",
    cidades: [
      "Delta", "Igarapava", "Aramina", "Ituverava", "Guara",
      "Sao Joaquim da Barra", "Orlandia", "Ribeirao Preto",
      "Franca", "Barretos", "Sao Jose do Rio Preto",
      "Araraquara", "Sao Carlos", "Sertaozinho"
    ],
    calcularFrete: () => "Entre R$ 70,00 e R$ 120,00",
    calcularPrazo: () => "Não especificado"
  },

  {
    nome: "034 ENCOMENDAS",
    telefone: "553491263558",
    cidades: [
      "Uberlandia", "Uberaba", "Conceicao das Alagoas",
      "Sacramento", "Delta", "Conquista", "Araguari", "Ituiutaba"
    ],
    calcularFrete: (cidade) => {
      const cidadeNorm = normalizar(cidade || "");
      return (cidadeNorm === "araguari" || cidadeNorm === "ituiutaba")
        ? "R$ 100,00"
        : "R$ 50,00";
    },
    calcularPrazo: () => "24 horas"
  },

  {
    nome: "LEONARDO FRETE",
    telefone: "3497965804",
    cidades: [
      "Sacramento", "Conquista", "Delta", "Conceicao",
      "Campo Florido", "Nova Ponte", "Perdizes", "Pedrinopolis",
      "Santa Juliana", "Agua Comprida", "Pirajuba",
      "Planura", "Verissimo", "Sertaozinho"
    ],
    calcularFrete: () => "Sob consulta",
    calcularPrazo: (cidade) => {
      const cidadeNorm = normalizar(cidade || "");
      return (cidadeNorm === "sacramento" || cidadeNorm === "conquista")
        ? "24 horas"
        : "48 horas";
    }
  },

  {
    nome: "RODOFAR",
    telefone: "34988552729",
    cidades: [
      "Abadia dos Dourados", "Lagoa Formosa", "Abaete dos Mendes", "Lagoa Grande",
      "Agua Comprida", "Limeira d'Oeste", "Alexandrita", "Matutina",
      "Aparecida de Minas", "Medeiros", "Araguari", "Monte Alegre de Minas",
      "Arapora", "Monte Carmelo", "Arapua", "Nova Ponte", "Araxa",
      "Patos de Minas", "Bambui", "Patrocinio", "Brejo Bonito", "Pedrinopolis",
      "Cachoeira Dourada", "Perdizes", "Campina Verde", "Pirajuba",
      "Campo Florido", "Planura", "Campos Altos", "Ponte Alta", "Canapolis",
      "Prata", "Capinopolis", "Pratinha", "Carmo do Paranaiba",
      "Presidente Olegario", "Carneirinho", "Quintinos", "Cascalho Rico",
      "Rio Paranaiba", "Centralina", "Romaria", "Comendador Gomes",
      "Sacramento", "Conceicao das Alagoas", "Salitre de Minas", "Conquista",
      "Santa Juliana", "Coromandel", "Santa Rosa da Serra", "Corrego Danta",
      "Santa Vitoria", "Cruzeiro da Fortaleza", "Sao Benedito", "Delta",
      "Sao Francisco de Sales", "Douradoquara", "Sao Goncalo do Abaete",
      "Estrela do Sul", "Sao Gotardo", "Flor de Minas",
      "Sao Joao da Serra Negra", "Fronteira", "Sao Sebastiao do Pontal",
      "Frutal", "Serra do Salitre", "Grupiara", "Tapira", "Guarda-Mor",
      "Tapirai", "Guimarania", "Tapuirana", "Gurinhata", "Tiros", "Honoropolis",
      "Tupaciguara", "Ibia", "Uberaba", "Indianopolis", "Uberlandia",
      "Ipiacu", "Uniao de Minas", "Irai de Minas", "Varjao de Minas",
      "Itapagipe", "Vazante", "Ituiutaba", "Veredas", "Iturama",
      "Verissimo", "Lagamar"
    ],
    calcularFrete: () => "Sob cotação",
    calcularPrazo: () => "A consultar"
  },

  {
    nome: "LUIS FRETE 24H",
    telefone: "3496589918",
    cidades: ["Araxa"],
    calcularFrete: () => "R$ 50,00",
    calcularPrazo: () => "A consultar"
  }
];

// Função auxiliar para normalizar texto
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
