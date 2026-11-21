import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalList, LegalPage, LegalSection } from "@/components/site/LegalPage";
import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/site/CookieBanner";

const title = "Política de Cookies | Maison da Costura";
const description = "Entenda cookies, armazenamento local, analytics e conteúdos externos usados no site do Maison da Costura.";

export const Route = createFileRoute("/cookies")({
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
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies" introduction="Esta página diferencia cookies de outras tecnologias, como armazenamento local e registros de navegação sem cookies, e explica como controlar as escolhas disponíveis.">
      <LegalSection title="1. O que são cookies e armazenamento local">
        <p>Cookies são pequenos arquivos que um site ou serviço pode gravar no navegador. Armazenamento local é outra forma de guardar informações no aparelho. Nem toda medição de audiência usa esses recursos.</p>
      </LegalSection>
      <LegalSection title="2. Recursos necessários">
        <p>Guardamos no armazenamento local a escolha feita no aviso de cookies para lembrá-la. A recusa é conservada por até 183 dias e a aceitação por até 365 dias, salvo se você apagar os dados do navegador antes. Se houver acesso à área opcional com conta, recursos de autenticação podem usar armazenamento necessário para manter a sessão e a segurança.</p>
      </LegalSection>
      <LegalSection title="3. Analytics do Lovable">
        <p>O analytics do Lovable não usa cookies, não grava informações no aparelho, não conserva endereços IP e não identifica visitantes. Ele registra páginas, origem da visita, país, navegador, sistema operacional, tipo de aparelho, permanência, velocidade de carregamento e erros. Dados detalhados são mantidos por 90 dias e resumos diários por um ano.</p>
        <p>Para visitantes na União Europeia/EEE, Reino Unido, Suíça e Canadá, ou quando o país não pode ser identificado, cliques e outras interações são registrados somente após aceite. O mesmo bloqueio ocorre quando o navegador envia Global Privacy Control, que funciona como rejeição. Para os demais visitantes, cliques são registrados salvo rejeição ou Global Privacy Control. Visitas, permanência, velocidade e erros são registrados para todo visitante, sem cookies e sem identificar a pessoa. O Lovable coleta esses dados para o Maison da Costura; a <a href="https://lovable.dev/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">política de privacidade do Lovable</a> explica esse tratamento.</p>
      </LegalSection>
      <LegalSection title="4. Conteúdos e links de terceiros">
        <LegalList items={[
          <><strong className="text-foreground">Tally:</strong> só é carregado depois do aceite de privacidade e da ação para abrir o formulário. O serviço pode usar cookies ou armazenamento necessários ao funcionamento e à segurança.</>,
          <><strong className="text-foreground">Google Maps:</strong> o mapa incorporado só é carregado quando você pede para exibi-lo. O Google pode registrar dados técnicos e usar cookies nesse momento.</>,
          <><strong className="text-foreground">Google Fonts:</strong> as fontes são solicitadas ao Google ao abrir o site; isso não deve ser confundido com um cookie próprio do Maison.</>,
          <><strong className="text-foreground">WhatsApp e Kiwify:</strong> funcionam fora deste site e só são abertos quando você escolhe esses links. Seus cookies e regras próprios podem se aplicar.</>,
        ]} />
      </LegalSection>
      <LegalSection title="5. Publicidade">
        <p>Até a data desta versão, o código do site não contém pixels ou tags de publicidade, remarketing ou correspondência de clientes. Se isso mudar, esta política e as escolhas de consentimento deverão ser atualizadas antes da ativação quando exigido.</p>
      </LegalSection>
      <LegalSection title="6. Como controlar">
        <p>Você pode aceitar ou rejeitar analytics no aviso e alterar a decisão pelo botão “Configurações de cookies” no rodapé. Também é possível apagar dados armazenados e bloquear cookies nas configurações do navegador, mas alguns recursos podem deixar de funcionar.</p>
        <p><button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))} className="text-primary underline underline-offset-4">Abrir configurações de cookies</button></p>
        <p>Para informações sobre dados pessoais, consulte a <Link to="/privacidade" className="text-primary underline underline-offset-4">Política de Privacidade</Link>.</p>
      </LegalSection>
    </LegalPage>
  );
}
