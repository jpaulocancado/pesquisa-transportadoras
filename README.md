# 🚚 Sistema de Consulta de Transportadoras

Sistema web para consulta e gerenciamento de transportadoras, com informações sobre fretes, prazos e cidades atendidas.

## 📋 Funcionalidades

### Página Principal (index.html)
- 🔍 Busca de transportadoras por nome
- 🏙️ Filtro por cidade
- 💰 Exibição de valores de frete
- ⏱️ Informações de prazos de entrega
- 📱 Botão de contato direto via WhatsApp
- 📍 Lista de cidades atendidas por cada transportadora

### Painel Administrativo (admin.html)
- ➕ Adicionar novas transportadoras
- ✏️ Editar transportadoras existentes
- 🗑️ Excluir transportadoras
- 🏙️ Gerenciar cidades atendidas
- 💰 Configurar fretes base e específicos por cidade
- ⏱️ Configurar prazos base e específicos por cidade
- 💾 Dados salvos localmente (localStorage)
- 🔄 Opção para resetar para dados padrão

## 🚀 Como Usar

### Instalação
1. Clone este repositório ou baixe os arquivos
2. Abra o arquivo `index.html` em seu navegador

### Acessar o Painel Administrativo
1. Na página principal, clique no botão "⚙️ Painel Administrativo"
2. Adicione, edite ou remova transportadoras conforme necessário
3. Configure fretes e prazos específicos para cada cidade

### Adicionar uma Nova Transportadora
1. No painel administrativo, clique em "➕ Nova Transportadora"
2. Preencha os dados:
   - Nome da transportadora
   - Telefone (WhatsApp)
   - Frete base
   - Prazo base
3. Adicione as cidades atendidas
4. (Opcional) Configure fretes e prazos específicos para cidades individuais
5. Clique em "💾 Salvar"

### Configurar Fretes/Prazos Específicos
1. Ao criar ou editar uma transportadora, marque a opção "Configurar fretes e prazos específicos por cidade"
2. Selecione uma cidade da lista
3. Defina o frete e/ou prazo específico para aquela cidade
4. As configurações específicas sobrescrevem os valores base

## 📁 Estrutura de Arquivos

```
├── index.html          # Página principal de consulta
├── admin.html          # Painel administrativo
├── styles.css          # Estilos da página principal
├── admin-styles.css    # Estilos do painel administrativo
├── app.js             # Lógica da página principal
├── admin.js           # Lógica do painel administrativo
├── data.js            # Dados padrão das transportadoras
└── README.md          # Este arquivo
```

## 💾 Armazenamento de Dados

Os dados são salvos no **localStorage** do navegador, permitindo que as alterações sejam mantidas entre sessões. Para resetar os dados para o padrão, use o botão "🔄 Resetar Dados" no painel administrativo.

## 🎨 Características Técnicas

- ✅ Totalmente responsivo (mobile-friendly)
- ✅ Interface moderna e intuitiva
- ✅ Sem necessidade de backend ou banco de dados
- ✅ Funciona offline (após primeiro carregamento)
- ✅ Normalização de texto para buscas (ignora acentos)
- ✅ Integração com WhatsApp

## 🔧 Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (Vanilla)
- LocalStorage API

## 📱 Compatibilidade

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Navegadores mobile

## 📝 Formato dos Dados

```javascript
{
  nome: "Nome da Transportadora",
  telefone: "34991234567",
  freteBase: "R$ 50,00",
  prazoBase: "24 horas",
  cidades: ["Cidade 1", "Cidade 2"],
  fretesPorCidade: {
    "cidade1": "R$ 70,00"  // normalizado
  },
  prazosPorCidade: {
    "cidade1": "48 horas"  // normalizado
  }
}
```

## 🤝 Contribuindo

Sinta-se livre para contribuir com melhorias:
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ para facilitar a gestão de transportadoras.

## 🆘 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.
