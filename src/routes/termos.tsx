import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalList, LegalPage, LegalSection } from "@/components/site/LegalPage";
import { contactEmail } from "@/lib/site";

const title = "Termos de Uso | Maison da Costura";
const description = "Condições para usar o site, consultar cursos, fazer pré-inscrições e acessar serviços externos do Maison da Costura.";

export const Route = createFileRoute("/termos")({
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
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Termos de Uso" introduction="Estes termos orientam o uso do site do Maison da Costura. Ao utilizar as páginas, formulários e links, você deve respeitar as condições abaixo e a legislação aplicável.">
      <LegalSection title="1. Informações sobre os cursos">
        <p>O site apresenta conteúdos, duração e valores dos cursos e oficinas. A pré-inscrição manifesta interesse, mas não garante matrícula, turma, horário ou vaga. A disponibilidade e as condições finais devem ser confirmadas diretamente com o Maison da Costura antes da contratação.</p>
        <p>Os conteúdos programáticos identificados como ilustrativos podem sofrer ajustes pedagógicos. O aprendizado depende de fatores individuais, participação e prática; o site não promete renda, contratação, certificação ou resultado profissional.</p>
      </LegalSection>
      <LegalSection title="2. Menores de 18 anos">
        <p>Os cursos aceitam alunos a partir de 8 anos. A pré-inscrição e a contratação para menores de 18 anos devem ser conduzidas por pai, mãe ou responsável legal. O responsável deve fornecer os consentimentos aplicáveis e acompanhar as condições informadas no atendimento.</p>
      </LegalSection>
      <LegalSection title="3. Materiais digitais e pagamentos">
        <p>Os links de materiais digitais direcionam ao ambiente da Kiwify. Preço final, condições de pagamento, entrega, identificação do vendedor e demais informações da oferta devem ser conferidos antes da conclusão da compra. Este site não solicita nem armazena dados de cartão.</p>
        <p>Direitos de cancelamento e reembolso são tratados na <Link to="/reembolso" className="text-primary underline underline-offset-4">Política de Troca e Reembolso</Link>.</p>
      </LegalSection>
      <LegalSection title="4. Assistente virtual">
        <p>O assistente usa inteligência artificial para responder com base nas informações do site e pode cometer erros. Confirme valores, datas, vagas e condições com a equipe antes de tomar uma decisão. Não envie senhas, dados de pagamento, documentos ou dados pessoais desnecessários.</p>
      </LegalSection>
      <LegalSection title="5. Uso adequado">
        <LegalList items={[
          "Não tentar acessar áreas restritas, interferir na segurança ou sobrecarregar o site.",
          "Não enviar conteúdo ilegal, ofensivo, enganoso ou que viole direitos de terceiros.",
          "Não copiar ou redistribuir materiais, textos, imagens e identidade visual sem autorização ou permissão legal.",
          "Fornecer informações verdadeiras na pré-inscrição e nos contatos.",
        ]} />
      </LegalSection>
      <LegalSection title="6. Propriedade intelectual e terceiros">
        <p>Textos, materiais e elementos próprios do site são protegidos pela legislação aplicável. Fotografias, nomes e marcas de pessoas e parceiros não podem ser reutilizados sem a autorização correspondente. Links e recursos de Tally, Google, WhatsApp, Kiwify, Lovable e outros terceiros estão sujeitos também aos termos desses serviços.</p>
      </LegalSection>
      <LegalSection title="7. Disponibilidade e responsabilidades">
        <p>Podemos atualizar ou interromper funcionalidades por manutenção, segurança ou mudanças nos cursos. Não garantimos funcionamento ininterrupto ou ausência absoluta de erros. Nada nestes termos exclui direitos obrigatórios do consumidor nem responsabilidades que a lei não permita limitar.</p>
      </LegalSection>
      <LegalSection title="8. Privacidade e contato">
        <p>O tratamento de dados é explicado na <Link to="/privacidade" className="text-primary underline underline-offset-4">Política de Privacidade</Link>. Dúvidas sobre estes termos podem ser enviadas para <a href={`mailto:${contactEmail}`} className="text-primary underline underline-offset-4">{contactEmail}</a>.</p>
      </LegalSection>
    </LegalPage>
  );
}
