import { createFileRoute } from "@tanstack/react-router";

import { LegalList, LegalPage, LegalSection } from "@/components/site/LegalPage";
import { contactEmail } from "@/lib/site";

const title = "Troca e Reembolso | Maison da Costura";
const description = "Como pedir cancelamento, troca ou reembolso de cursos e materiais digitais do Maison da Costura conforme os direitos do consumidor.";

export const Route = createFileRoute("/reembolso")({
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
  component: RefundPage,
});

function RefundPage() {
  return (
    <LegalPage title="Política de Troca e Reembolso" introduction="Esta política orienta pedidos relacionados a cursos, oficinas e materiais digitais, sem reduzir direitos obrigatórios previstos no Código de Defesa do Consumidor (CDC — Lei nº 8.078/1990).">
      <LegalSection title="1. Arrependimento em compras à distância">
        <p>Quando a contratação ocorrer fora do estabelecimento, como pela internet ou pelo WhatsApp, o consumidor pode se arrepender em até 7 dias corridos a contar da contratação, conforme o art. 49 do CDC. Não é necessário apresentar justificativa. A comunicação dentro desse prazo deve ser enviada para <a href={`mailto:${contactEmail}`} className="text-primary underline underline-offset-4">{contactEmail}</a>.</p>
        <p>Os valores comprovadamente pagos pela contratação cancelada serão devolvidos, observadas as regras do meio de pagamento e da plataforma utilizada. O prazo operacional pode variar conforme o provedor de pagamento.</p>
      </LegalSection>
      <LegalSection title="2. Cursos e oficinas">
        <p>No pedido, informe nome, curso ou oficina, data aproximada da contratação e o contato usado na inscrição. Se a aquisição tiver sido feita por um responsável, o pedido deve ser feito pelo mesmo responsável.</p>
        <p>Após o prazo de arrependimento, pedidos de cancelamento, troca de turma ou devolução serão analisados conforme as condições informadas na contratação e a legislação aplicável. Se o Maison da Costura cancelar uma atividade, o aluno poderá escolher entre a alternativa oferecida ou a devolução proporcional dos valores pagos pela parte não realizada, sem prejuízo de outros direitos legais.</p>
      </LegalSection>
      <LegalSection title="3. Materiais digitais vendidos pela Kiwify">
        <p>O checkout e o processamento do pagamento acontecem na Kiwify. Para pedidos de cancelamento ou reembolso, use primeiro o e-mail <a href={`mailto:${contactEmail}`} className="text-primary underline underline-offset-4">{contactEmail}</a> e informe nome, material adquirido, data aproximada e e-mail usado na compra. Não envie número de cartão ou senha.</p>
        <p>O direito de arrependimento nas aquisições à distância e os direitos relativos a problemas no conteúdo ou na entrega serão respeitados conforme o CDC. A análise pode precisar da identificação da transação na Kiwify.</p>
      </LegalSection>
      <LegalSection title="4. Problemas com o serviço ou produto">
        <p>Se houver divergência entre o que foi contratado e o que foi fornecido, falha de acesso ou outro problema, entre em contato para que a situação seja verificada e solucionada. Os prazos e soluções legais aplicáveis a vícios de serviços e produtos não são reduzidos por esta política.</p>
      </LegalSection>
      <LegalSection title="5. Como acompanhar o pedido">
        <LegalList items={[
          <>Envie a solicitação para <a href={`mailto:${contactEmail}`} className="text-primary underline underline-offset-4">{contactEmail}</a> com os dados mínimos indicados acima.</>,
          "A equipe poderá confirmar a identidade e localizar a contratação antes de concluir o atendimento.",
          "Quando houver pagamento pela Kiwify, a devolução poderá depender do processamento pela plataforma e pelo meio de pagamento.",
          "Guarde a mensagem de solicitação e as comunicações recebidas.",
        ]} />
      </LegalSection>
    </LegalPage>
  );
}
