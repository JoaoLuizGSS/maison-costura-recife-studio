import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalList, LegalPage, LegalSection } from "@/components/site/LegalPage";
import { address, businessName, contactEmail, contacts } from "@/lib/site";

const title = "Política de Privacidade | Maison da Costura";
const description = "Saiba como o Maison da Costura trata dados de pré-inscrição, contato, assistente e navegação, incluindo direitos e dados de menores.";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade" introduction="Esta política explica quais dados pessoais são tratados pelo Maison da Costura, para quais finalidades, com quais serviços eles podem ser compartilhados e como você pode exercer seus direitos previstos na Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).">
      <LegalSection title="1. Quem responde pelos dados">
        <p>O responsável pelas decisões sobre o tratamento dos dados coletados neste site é {businessName}. Solicitações sobre privacidade podem ser enviadas para <a className="text-primary underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a>, pelos telefones {contacts[0]?.phone} e {contacts[1]?.phone}, ou pelo endereço {address}</p>
      </LegalSection>

      <LegalSection title="2. Dados coletados e finalidades">
        <LegalList items={[
          <><strong className="text-foreground">Pré-inscrição no Tally:</strong> nome completo, data de nascimento, WhatsApp, e-mail, nível de costura, turno, dias preferidos e curso de interesse. Usamos esses dados para verificar a faixa etária, organizar turmas e preferências, responder ao interessado e realizar contatos sobre a pré-inscrição.</>,
          <><strong className="text-foreground">Contato por WhatsApp ou e-mail:</strong> o conteúdo que você decidir enviar, além do número ou endereço usado no contato, para atendimento e continuidade da conversa.</>,
          <><strong className="text-foreground">Assistente virtual:</strong> as perguntas enviadas são processadas para gerar respostas sobre os cursos. Não envie documentos, senhas, dados financeiros ou dados pessoais desnecessários.</>,
          <><strong className="text-foreground">Área opcional com conta:</strong> quando utilizada, os provedores de entrada podem fornecer dados de identificação da conta; conversas e dados de perfil são armazenados no backend do site para manter o histórico.</>,
          <><strong className="text-foreground">Navegação:</strong> o Lovable registra páginas visitadas, origem da visita, país, navegador, sistema operacional, tipo de aparelho, permanência, velocidade de carregamento e erros. Cliques também são registrados, conforme a escolha de analytics.</>,
        ]} />
        <p>A pré-inscrição não confirma automaticamente uma matrícula ou reserva de vaga. Os dados de pagamento não passam por este site: compras dos materiais digitais são feitas na Kiwify.</p>
      </LegalSection>

      <LegalSection title="3. Crianças e adolescentes">
        <p>Os cursos aceitam alunos a partir de 8 anos. A pré-inscrição de pessoa menor de 18 anos deve ser feita por seu pai, mãe ou responsável legal. A data de nascimento é usada para identificar essa necessidade e organizar o atendimento adequado à idade.</p>
        <p>Para crianças menores de 12 anos, o tratamento baseado em consentimento exige consentimento específico e em destaque dado por pelo menos um dos pais ou responsável legal, nos termos do art. 14 da LGPD. O tratamento de dados de crianças e adolescentes deve observar sempre o seu melhor interesse. Não solicitamos dados do menor pelo assistente virtual.</p>
      </LegalSection>

      <LegalSection title="4. Bases legais">
        <p>Conforme o caso, o tratamento pode se apoiar no consentimento, inclusive o consentimento do responsável; em procedimentos preliminares relacionados a contrato pedidos pelo titular; no cumprimento de obrigação legal ou regulatória; e no legítimo interesse, quando cabível e após avaliação dos direitos e liberdades do titular. Quando o consentimento for a base, ele pode ser revogado para usos futuros.</p>
      </LegalSection>

      <LegalSection title="5. Serviços de terceiros e compartilhamento">
        <LegalList items={[
          <><strong className="text-foreground">Tally:</strong> recebe e armazena as respostas da pré-inscrição quando você abre e envia o formulário.</>,
          <><strong className="text-foreground">Lovable:</strong> fornece hospedagem, backend, autenticação opcional, analytics e a infraestrutura de acesso ao modelo de IA.</>,
          <><strong className="text-foreground">Google Gemini:</strong> processa as mensagens do assistente para gerar respostas por meio da infraestrutura de IA do Lovable.</>,
          <><strong className="text-foreground">WhatsApp/Meta:</strong> recebe os dados necessários quando você escolhe iniciar uma conversa externa.</>,
          <><strong className="text-foreground">Kiwify:</strong> processa a compra e o pagamento dos materiais digitais em seu próprio ambiente.</>,
          <><strong className="text-foreground">Google Maps e Google Fonts:</strong> o mapa é carregado somente após sua ação; as fontes são obtidas do Google ao abrir as páginas. Esses serviços podem receber dados técnicos, como endereço IP e informações do navegador.</>,
        ]} />
        <p>Não vendemos dados pessoais. Os fornecedores têm políticas próprias e podem processar dados fora do Brasil; transferências internacionais devem observar os mecanismos e garantias exigidos pela LGPD.</p>
      </LegalSection>

      <LegalSection title="6. Analytics e escolhas de privacidade">
        <p>O analytics do Lovable não usa cookies, não armazena informações no aparelho do visitante, não conserva endereços IP e não identifica pessoas. Cada visita é contada separadamente. Dados detalhados ficam retidos por 90 dias e resumos diários por um ano. A <Link to="/cookies" className="text-primary underline underline-offset-4">Política de Cookies</Link> explica as escolhas disponíveis.</p>
      </LegalSection>

      <LegalSection title="7. Armazenamento e segurança">
        <p>Os dados devem ser mantidos somente pelo período necessário para as finalidades informadas, para o cumprimento de obrigações legais ou para o exercício regular de direitos. Depois disso, devem ser eliminados ou anonimizados, quando aplicável. São adotadas medidas técnicas e organizacionais razoáveis de proteção, mas nenhum sistema é totalmente livre de riscos.</p>
      </LegalSection>

      <LegalSection title="8. Seus direitos">
        <p>Nos casos previstos pela LGPD, você pode pedir confirmação de tratamento, acesso, correção, informações sobre compartilhamento, portabilidade, revisão de decisões automatizadas, eliminação de dados tratados com consentimento, revogação do consentimento e oposição a tratamento irregular.</p>
        <p>Para pedidos sobre inscrições de menores, podemos solicitar informações proporcionais para confirmar a identidade e a relação de responsabilidade, sem exigir dados desnecessários. Envie a solicitação para <a className="text-primary underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a>. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).</p>
      </LegalSection>

      <LegalSection title="9. Atualizações">
        <p>Esta política pode ser atualizada quando houver mudanças no site, nos fornecedores ou nas práticas de tratamento. A data da versão vigente aparece no início desta página.</p>
      </LegalSection>
    </LegalPage>
  );
}
