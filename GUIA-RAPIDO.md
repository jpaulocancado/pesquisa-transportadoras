# 🚀 Guia Rápido de Uso

## 📦 Para fazer upload no GitHub:

1. **Inicialize o repositório Git:**
   ```bash
   git init
   git add .
   git commit -m "Primeiro commit - Sistema de consulta de transportadoras"
   ```

2. **Crie um repositório no GitHub** (https://github.com/new)

3. **Conecte e envie os arquivos:**
   ```bash
   git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
   git branch -M main
   git push -u origin main
   ```

## 🎯 Como usar o sistema:

### Usuário Final (Consulta)
1. Abra `index.html` no navegador
2. Selecione uma transportadora ou busque por cidade
3. Clique no botão WhatsApp para contato direto

### Administrador (Gerenciamento)
1. Abra `index.html` e clique em "⚙️ Painel Administrativo"
2. **Para adicionar uma transportadora:**
   - Clique em "➕ Nova Transportadora"
   - Preencha nome, telefone, frete base e prazo base
   - Adicione as cidades uma por uma
   - (Opcional) Configure fretes/prazos específicos por cidade
   - Clique em "💾 Salvar"

3. **Para configurar frete/prazo específico:**
   - Ao criar/editar, marque "Configurar fretes e prazos específicos por cidade"
   - Selecione a cidade
   - Digite o valor/prazo específico
   - Clique em "Salvar Configuração"
   - Repita para outras cidades se necessário

4. **Para editar:** Clique em "✏️ Editar" na transportadora desejada
5. **Para excluir:** Clique em "🗑️ Excluir" (pede confirmação)

## 💡 Dicas:

- ✅ Os dados são salvos automaticamente no navegador
- ✅ Configure fretes diferentes para cada cidade (ex: cidade A = R$ 50, cidade B = R$ 80)
- ✅ Configure prazos diferentes (ex: cidade próxima = 24h, cidade distante = 48h)
- ✅ Use o botão "🔄 Resetar Dados" para voltar aos dados originais
- ✅ Não precisa de servidor, funciona direto no navegador

## 📱 Hospedagem Gratuita:

Você pode hospedar gratuitamente em:
- **GitHub Pages**: Ative nas configurações do repositório
- **Netlify**: Conecte seu repositório GitHub
- **Vercel**: Deploy automático do GitHub

### GitHub Pages (Recomendado):
1. No seu repositório GitHub, vá em Settings > Pages
2. Em "Source", selecione a branch "main"
3. Clique em "Save"
4. Seu site estará em: `https://SEU-USUARIO.github.io/NOME-DO-REPO/`

## 🎨 Personalização:

Para mudar as cores, edite o arquivo `styles.css` e `admin-styles.css`:
- Linha 16 (styles.css): `background: linear-gradient(...)` - Cor de fundo
- Linha 79 (styles.css): `color: #667eea` - Cor dos títulos
- Linha 100 (styles.css): `background: #25D366` - Cor do botão WhatsApp

## 🔒 Segurança:

- ✅ Todos os dados ficam apenas no navegador do usuário
- ✅ Nenhuma informação é enviada para servidores externos
- ✅ Funciona 100% offline após carregar

## 📞 Suporte:

Se tiver dúvidas sobre alguma funcionalidade:
1. Consulte o README.md para documentação completa
2. Verifique se seguiu todos os passos corretamente
3. Abra uma issue no GitHub para reportar problemas
