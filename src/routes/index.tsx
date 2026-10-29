import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, MapPin, MessageCircle, Navigation, Scissors, Users, Wallet, BookOpen } from "lucide-react";
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
  return (
    <ContactChooserProvider>
      <Header />
      <main>
        <Hero />
        <Courses />
        <CosturaDetails />
        <ModelagemDetails />
        <About />
        <Founders />
        <Gallery />
        <Partnership />
        <Contact />
        <Location />
      </main>
      <Footer />
    </ContactChooserProvider>
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
            <a href="#contato" className={btn("light")}><MessageCircle className="h-4 w-4" aria-hidden /> Falar pelo WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ img, alt, name, text, info, cta, course }: { img: string; alt: string; name: string; text: string; info: [string, string][]; cta: string; course: "costura" | "modelagem" }) {
  const choose = useContactChooser();
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <img src={img} alt={alt} width={1200} height={912} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="mt-3 text-muted-foreground">{text}</p>
        <div className="my-6"><InfoList items={info} /></div>
        <button onClick={() => choose(course)} className={btn("primary", "mt-auto")}>{cta}</button>
      </div>
    </article>
  );
}

function Courses() {
  return (
    <section id="cursos" className="mx-auto max-w-6xl px-4 py-24">
      <SectionTitle eyebrow="Nossos cursos" title="Encontre o curso ideal para você" />
      <div className="grid gap-8 md:grid-cols-2">
        <CourseCard course="costura" img={costura} alt="Mãos costurando tecido rosa em máquina antiga" name="Curso de Corte e Costura"
          text="Aprenda corte e costura desde os primeiros passos ou aperfeiçoe seus conhecimentos. Conheça os materiais, desenvolva habilidades práticas e descubra as possibilidades de criar e confeccionar suas próprias peças."
          info={[["Duração", courses.costura.duration], ["Mensalidade", `${courses.costura.price} por mês`], ["Público", "Iniciantes e intermediários"]]}
          cta="Tenho Interesse em Corte e Costura" />
        <CourseCard course="modelagem" img={modelagem} alt="Moldes de papel com régua, lápis e fita métrica" name="Curso de Modelagem"
          text="Aprenda a desenvolver moldes de roupas e conheça a construção de seis modelagens diferentes. Explore peças variadas e amplie seus conhecimentos para aplicar em seus projetos de costura."
          info={[["Duração", courses.modelagem.duration], ["Investimento total", `${courses.modelagem.price} (curso completo)`], ["Conteúdo", "6 aulas de modelagem"]]}
          cta="Tenho Interesse em Modelagem" />
      </div>
    </section>
  );
}

const topics = ["Conhecendo os materiais de costura.", "Introdução à máquina de costura.", "Tipos de tecidos.", "Medidas e preparação dos tecidos.", "Noções de corte.", "Técnicas de costura.", "Acabamentos e detalhes.", "Prática de confecção."];

function HighlightBox({ items, note, children }: { items: { icon: typeof Clock; label: string; value: string }[]; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-ink p-8 text-ink-foreground shadow-soft">
      <ul className="space-y-5">
        {items.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-primary"><Icon className="h-5 w-5" aria-hidden /></span>
            <span><span className="block text-xs uppercase tracking-widest text-blush">{label}</span><span className="font-display text-xl">{value}</span></span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-6 rounded-md border border-blush/40 p-3 text-sm text-ink-foreground/90">{note}</p>}
      <div className="mt-7">{children}</div>
    </div>
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

function Founders() {
  return (
    <section id="fundadoras" className="mx-auto max-w-6xl px-4 py-24">
      <SectionTitle eyebrow="Quem faz acontecer" title="As Fundadoras">
        Duas histórias, uma paixão: transformar ideias em peças únicas.
      </SectionTitle>
      <div className="grid gap-10 md:grid-cols-2">
        <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <img
            src={lauraImg}
            alt="Laura Ayres"
            className="aspect-[4/5] w-full rounded-xl object-cover object-[center_-30px] shadow-sm"
          />

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
          <img
            src={tatianaImg}
            alt="Tatiana"
            className="aspect-[4/5] w-full rounded-xl object-cover object-top shadow-sm"
          />
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
        <div className="mt-10 inline-flex flex-col items-center rounded-xl border border-border bg-card p-6 shadow-soft sm:flex-row sm:gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <MapPin className="h-5 w-5 text-primary shrink-0" aria-hidden />
            <span>Rua do Livramento, 93, São José, Recife - PE. CEP: 50020-570.</span>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Rua+do+Livramento,+93,+S%C3%A3o+Jos%C3%A9,+Recife+-+PE,+50020-570"
            target="_blank"
            rel="noopener noreferrer"
            className={btn("primary", "mt-4 sm:mt-0")}
          >
            <MapPin className="h-4 w-4" aria-hidden /> Ver localização
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle eyebrow="Contato" title="Fale com o Maison da Costura">
          Tem dúvidas sobre nossos cursos? Entre em contato com nossa equipe. Será um prazer conversar com você!
        </SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          {contacts.map((c) => (
            <article key={c.id} className="rounded-xl border border-border bg-card p-8 text-center shadow-soft">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary font-script text-4xl text-primary" aria-hidden>{c.name[0]}</span>
              <h3 className="mt-4 text-2xl font-semibold">{c.name}</h3>
              <p className="mt-1 text-muted-foreground">{c.phone}</p>
              <a href={whatsappLink(c.id)} target="_blank" rel="noopener noreferrer" className={btn("whatsapp", "mt-6 w-full")}>
                <MessageCircle className="h-4 w-4" aria-hidden /> Falar com {c.name} pelo WhatsApp
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="como-chegar" className="mx-auto max-w-6xl px-4 py-24">
      <SectionTitle eyebrow="Como chegar" title="Venha conhecer o Maison da Costura" />
      <div className="grid gap-8 overflow-hidden rounded-xl border border-border bg-card shadow-soft md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <MapPin className="h-10 w-10 text-primary" aria-hidden />
          <address className="mt-4 font-display text-2xl not-italic leading-snug">{address}</address>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className={btn("primary")}><MapPin className="h-4 w-4" aria-hidden /> Ver no Google Maps</a>
            <a href={mapsRouteUrl} target="_blank" rel="noopener noreferrer" className={btn("outline")}><Navigation className="h-4 w-4" aria-hidden /> Traçar Rota</a>
          </div>
        </div>
        <iframe title="Mapa do Maison da Costura" src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full border-0 md:h-full md:min-h-[380px]" />
      </div>
    </section>
  );
}
