# Revisão legal, privacidade e acessibilidade

## 1. Páginas e aviso de privacidade
- Criar Política de Privacidade, Termos de Uso, Política de Cookies e Política de Troca e Reembolso, em português, usando somente os dados confirmados do Maison da Costura.
- Informar Tally, WhatsApp, Kiwify, Google Maps, Google Fonts, assistente com IA e analytics do Lovable conforme o funcionamento verificado no código e nas configurações.
- Não exibir o CPF. Identificar o contato pelo nome Maison da Costura, e-mail, telefones e endereço já publicados.
- Adicionar os quatro links ao rodapé e um atalho permanente para as configurações de cookies.
- Implementar um aviso de cookies não modal, com Aceitar, Rejeitar e configurações por finalidade, ligado às escolhas de analytics.

## 2. Formulário e serviços de terceiros
- Só carregar o Tally após a pessoa marcar o aceite com link para a Política de Privacidade e abrir o formulário.
- Explicar que o aceite definitivo deve também ser um campo obrigatório dentro do Tally para ficar registrado com cada resposta.
- Listar os campos recomendados para remoção: data de nascimento, salvo necessidade relacionada a menores; e-mail, caso não seja usado. Apontar que o Tally precisa incluir Ajustes e Reformas.
- Carregar o Google Maps incorporado somente após uma ação da pessoa; manter os links externos de rota.
- Documentar riscos e finalidade de cada serviço externo.

## 3. Acessibilidade
- Manter textos alternativos já presentes e melhorar os que identificam pessoas.
- Medir contraste real dos tokens e corrigir combinações abaixo de WCAG AA.
- Corrigir foco, fechamento por Escape e devolução de foco do assistente; adicionar nome ao botão de rolagem.
- Garantir navegação por teclado no aviso de cookies, formulário de abertura, mapa e páginas legais.
- Manter nomes claros em botões e links e destino correto para o mapa da parceria.

## 4. Conteúdo e transparência
- Remover ou suavizar promessas absolutas e avisos de escassez que exijam comprovação contínua, sem apagar fatos confirmados dos cursos.
- Acrescentar e-mail de contato no rodapé e na seção de contato, sem CPF.
- Entregar um inventário de imagens, fontes e ícones com origem conhecida e pendências de licença/autorização.

## 5. Verificação e entrega
- Atualizar sitemap e testes das novas páginas e das regras alteradas.
- Testar navegação, teclado, cookies, aceite do formulário, mapa e contraste no navegador.
- Entregar checklist final: feito, pendente no Tally/hospedagem e itens para advogado revisar, sem declarar conformidade jurídica garantida.

## Detalhes técnicos
- Novas rotas TanStack com metadados próprios e layout legal compartilhado.
- Módulo oficial de consentimento em `src/lib/consent.ts`, configurações no `head()` da raiz e componente visual do aviso.
- Dados públicos de contato centralizados em `src/lib/site.ts`.
- Nenhuma alteração de banco, autenticação ou cobrança.
