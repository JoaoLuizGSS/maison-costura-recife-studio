import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Check, Clock, MapPin, MessageCircle, Navigation, Scissors, Users, Wallet, BookOpen } from "lucide-react";
import hero from "@/assets/hero.jpg";
import costura from "@/assets/costura.jpg";
import modelagem from "@/assets/modelagem.jpg";
import tecidos from "@/assets/tecidos.jpg";
import pecas from "@/assets/pecas.jpg";
import acabamento from "@/assets/acabamento.jpg";
import lauraImg from "@/assets/laura.jpg";
import tatianaImg from "@/assets/tatiana.png";
import patioLogo from "@/assets/patio-tecidos.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactChooserProvider, useContactChooser } from "@/components/site/ContactChooser";
import { InfoList, SectionTitle, btn } from "@/components/site/ui";
import { address, contacts, courses, mapsEmbedUrl, mapsRouteUrl, mapsSearchUrl, whatsappLink } from "@/lib/site";

const title = "Maison da Costura | Cursos de Corte, Costura e Modelagem em Recife";
const description = "Cursos de corte e costura e de modelagem de roupas em Santo Amaro, Recife-PE. Conheça valores, duração e fale conosco pelo WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
useEffect(() => {
const script = document.createElement("script");
script.src = "tally.so";
script.async = true;
document.body.appendChild(script);
return () => {
document.body.removeChild(script);
};
}, []);
return (
);
}
function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ink text-ink-foreground">
      <img src={hero} alt="Ateliê de costura com máquina antiga, tecidos rosa e manequim" width={1600} height={1072} className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36">
        <div className="max-w-2xl">
          <p className="font-script text-3xl text-blush md:text-4xl">Maison da Costura</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">Transforme sua paixão em arte com a costura!</h1>
          <p className="mt-6 text-lg text-ink-foreground/85">
            No Maison da Costura, você aprende a cortar, costurar e desenvolver modelagens para dar vida às suas ideias. Descubra nossos cursos e desenvolva suas habilidades no universo da moda.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#cursos" className={btn("primary")}>Conhecer os Cursos</a>
            <a href="#pre-inscricao" className={btn("light")}>Garantir Vaga</a>
            <Link to="/chat" className={btn("light")}><Bot className="h-4 w-4" aria-hidden /> Tirar dúvidas com o assistente</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CosturaDetails() {
  const choose = useContactChooser();
  return (
    <section id="corte-e-costura" className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Corte e Costura" title="Aprenda a costurar e transforme suas ideias em realidade" />
        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {topics.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-lg bg-card p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Conteúdos ilustrativos, que podem ser ajustados de acordo com o programa do curso.</p>
          </div>
          <HighlightBox items={[{ icon: Clock, label: "Duração", value: "3 meses" }, { icon: Wallet, label: "Mensalidade", value: "R$ 300,00 / mês" }, { icon: Users, label: "Público", value: "Iniciantes e intermediários" }]}>
            <button onClick={() => choose("costura")} className={btn("primary", "w-full")}><MessageCircle className="h-4 w-4" aria-hidden /> Falar sobre Corte e Costura</button>
          </HighlightBox>
        </div>
      </div>
    </section>
  );
}

const lessons = [
  ["Saia Base", "Aprenda a desenvolver a modelagem base de uma saia."],
  ["Saia Evasê e Saia Lápis", "Conheça a modelagem de dois estilos de saia: evasê e lápis."],
  ["Blusa Manga Japonesa", "Aprenda a construir a modelagem de uma blusa com manga japonesa."],
  ["Calça Cós de Elástico", "Desenvolva a modelagem de uma calça com cós de elástico."],
  ["Vestido Tubinho", "Conheça a construção da modelagem de um vestido tubinho."],
  ["Calça de Pijama Feminina", "Aprenda a desenvolver a modelagem de uma calça feminina de pijama."],
] as const;

function ModelagemDetails() {
  const choose = useContactChooser();
  return (
    <section id="modelagem" className="mx-auto max-w-6xl px-4 py-24">
      <SectionTitle eyebrow="Modelagem" title="Aprenda a criar moldes para diferentes peças">
        Conheça as etapas de desenvolvimento de modelagens de roupas e aprenda a construir seis modelos diferentes durante o curso de Modelagem do Maison da Costura.
      </SectionTitle>
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map(([name, text], i) => (
          <li key={name} className="relative rounded-xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-soft">
            <span className="font-display text-5xl text-accent" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
            <Scissors className="absolute right-6 top-7 h-6 w-6 text-primary/60" aria-hidden />
            <p className="mt-3 text-xs uppercase tracking-widest text-primary">Aula {i + 1}</p>
            <h3 className="mt-1 text-xl font-semibold">{name}</h3>
            <p className="mt-2 text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
      <div className="mx-auto mt-12 max-w-xl">
        <HighlightBox note="O valor de R$ 600,00 corresponde ao curso completo, não a uma mensalidade."
          items={[{ icon: Clock, label: "Duração", value: "1 mês e meio" }, { icon: Wallet, label: "Valor total", value: "R$ 600,00" }, { icon: BookOpen, label: "Quantidade", value: "6 aulas de modelagem" }]}>
          <button onClick={() => choose("modelagem")} className={btn("primary", "w-full")}>Quero Saber Mais sobre Modelagem</button>
        </HighlightBox>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="bg-ink py-24 text-ink-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <img src={tecidos} alt="Tecidos dobrados em tons de rosa, bege e preto com linhas" width={1200} height={1200} loading="lazy" className="aspect-square rounded-xl object-cover" />
          <img src={hero} alt="Ambiente de ateliê com máquina de costura" width={1600} height={1072} loading="lazy" className="mt-10 aspect-square rounded-xl object-cover" />
        </div>
        <div>
          <p className="font-script text-3xl text-blush">Sobre nós</p>
          <h2 className="mt-1 text-3xl font-semibold md:text-4xl">Aprendizado, criatividade e paixão pela costura</h2>
          <div className="mt-5 w-24 stitch" aria-hidden />
          <p className="mt-6 text-lg text-ink-foreground/85">
            O Maison da Costura é um espaço dedicado ao aprendizado de corte, costura e modelagem. Oferecemos cursos para pessoas que desejam desenvolver suas habilidades, aprender novas técnicas e explorar as possibilidades de criar roupas.
          </p>
        </div>
      </div>
    </section>
  );
}

function Teachers() {
  return (
    <section id="professoras" className="mx-auto max-w-6xl px-4 py-24">
      <SectionTitle eyebrow="Quem faz acontecer" title="As Professoras">
        Duas histórias, uma paixão: transformar ideias em peças únicas.
      </SectionTitle>
      <div className="grid gap-10 md:grid-cols-2">
        <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <img src={lauraImg} alt="Laura Ayres" className="aspect-[4/5] w-full rounded-xl object-cover object-center shadow-sm" />
          <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Laura Ayres</h3>
          <div className="mt-4 space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Laura Ayres é designer de moda sustentável, educadora e idealizadora de projetos voltados para costura, modelagem, upcycling e geração de renda através da moda. Atua na formação de pessoas por meio de cursos e oficinas de corte, costura e criação, utilizando a moda como ferramenta de transformação social, valorização cultural e desenvolvimento de novos negócios.
            </p>
            <p>
              Seu trabalho conecta criatividade, sustentabilidade e empreendedorismo, incentivando a transformação de resíduos têxteis em produtos com identidade e propósito.
            </p>
          </div>
        </article>

        <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <img src={tatianaImg} alt="Tatiana" className="aspect-[4/5] w-full rounded-xl object-cover object-top shadow-sm" />
          <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Tatiana</h3>
          <div className="mt-4 space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Me chamo Tatiana, sou costureira a cerca de 10 anos. Comecei costurando Roupas de Cama assistindo vídeos no YouTube e desde então me apaixonei pela costura. Meu início foi em Moda Casa e com o tempo senti a necessidade de aprender coisas novas, como roupas, já que meus filhos nasceram e a necessidade surgiu.
            </p>
            <p>
              Foi quando resolvi fazer o curso de Corte, Costura e Modelagem no Senac-PE. Desde então tenho realizado cursos para me aprimorar na costura, fazendo roupas sob medida para minhas clientes. A costureira tira do papel o sonho de suas clientes, que são os vestidos/roupas idealizados por elas.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    { src: hero, alt: "Máquina de costura antiga no ateliê", w: 1600, h: 1072, cls: "md:col-span-2 md:row-span-2" },
    { src: tecidos, alt: "Tecidos e linhas", w: 1200, h: 1200, cls: "" },
    { src: pecas, alt: "Vestido e blusa em manequins", w: 1008, h: 1312, cls: "md:row-span-2" },
    { src: modelagem, alt: "Moldes de roupas em papel", w: 1200, h: 912, cls: "" },
    { src: acabamento, alt: "Detalhe de acabamento com renda e linha rosa", w: 1200, h: 912, cls: "md:col-span-2" },
    { src: costura, alt: "Costura em máquina", w: 1200, h: 912, cls: "" },
  ];
  return (
    <section id="galeria" className="mx-auto max-w-7xl px-4 py-24">
      <SectionTitle eyebrow="Inspiração" title="Costurando ideias, criando possibilidades" />
      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
        {items.map((i) => (
          <img key={i.alt} src={i.src} alt={i.alt} width={i.w} height={i.h} loading="lazy" className={`h-full w-full rounded-xl object-cover ${i.cls}`} />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">Imagens meramente ilustrativas.</p>
    </section>
  );
}

function Partnership() {
  return (
    <section id="parceria" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <SectionTitle eyebrow="Parceria" title="Uma parceria que fortalece o universo da costura" />
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-card p-8 shadow-soft">
          <img src={patioLogo} alt="Pátio Tecidos e Aviamentos" className="mx-auto h-28 w-auto object-contain" />
          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">Pátio Tecidos e Aviamentos</h3>
        </div>
        <div className="mx-auto mt-8 max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            O Maison da Costura tem a satisfação de apresentar sua parceria com a Pátio Tecidos e Aviamentos, empresa localizada no Recife, que faz parte do universo dos tecidos e aviamentos.
          </p>
          <p>
            Essa parceria aproxima duas marcas ligadas ao mundo da costura, valorizando os materiais, a criatividade e o desenvolvimento de projetos que dão vida a novas ideias.
          </p>
        </div>
Use o código com cuidado.
Rua do Livramento, 93, São José, Recife - PE. CEP: 50020-570.

<a href="google.com" target="_blank" rel="noopener noreferrer" className={btn("primary", "mt-4 sm:mt-0")}>
 Ver localização




);
}
function PreInscricao() {
return (
Preencha o formulário oficial abaixo. Assim que terminar, os dados serão enviados diretamente para as professoras Tatiana e Laura entrarem em contato!


<iframe
data-tally-src="tally.so"
loading="lazy"
width="100%"
height="550"
title="Formulário de Pré-Inscrição Maison da Costura"
style={{ border: "none" }}
className="w-full max-w-2xl"
/>



);
}
function Contact() {
return (
Tem dúvidas sobre nossos cursos? Entre em contato com nossa equipe. Será um prazer conversar com você!


{contacts.map((c) => (

{c.name}
{c.name}
{c.phone}
<a href={whatsappLink(c.id)} target="_blank" rel="noopener noreferrer" className={btn("whatsapp", "mt-6 w-full")}>
 Falar com {c.name} pelo WhatsApp


))}



);
}
function Location() {
return (
{address}

<a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className={btn("primary")}> Ver no Google Maps
<a href={mapsRouteUrl} target="_blank" rel="noopener noreferrer" className={btn("outline")}> Traçar Rota





);
}
