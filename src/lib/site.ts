export type ContactId = "tatiana" | "laura";
export type CourseId = "costura" | "modelagem" | "ajustes";

export const contacts = [
  { id: "tatiana" as const, name: "Tatiana", phone: "(81) 99132-4803", wa: "5581991324803" },
  { id: "laura" as const, name: "Laura", phone: "(81) 98652-7779", wa: "5581986527779" },
];

export const courseNames: Record<CourseId, string> = {
  costura: "Corte e Costura",
  modelagem: "Modelagem",
  ajustes: "Ajustes e Reformas",
};

export function whatsappMessage(contact: ContactId, course?: CourseId) {
  const c = contacts.find((x) => x.id === contact)!;
  if (course) {
    return `Olá, ${c.name}! Tenho interesse no curso de ${courseNames[course]} do Maison da Costura. Gostaria de receber mais informações.`;
  }
  return `Olá, ${c.name}! Encontrei o site do Maison da Costura e gostaria de receber informações sobre os cursos.`;
}

export function whatsappLink(contact: ContactId, course?: CourseId) {
  const c = contacts.find((x) => x.id === contact)!;
  return `https://wa.me/${c.wa}?text=${encodeURIComponent(whatsappMessage(contact, course))}`;
}

export const address =
  "Av. Visconde de Suassuna, 337, Santo Amaro. Recife-PE.";
const q = "Av. Visconde de Suassuna, 337, Santo Amaro, Recife, PE";
export const mapsSearchUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const courses = {
  costura: { duration: "3 meses", price: "R$ 300,00", priceLabel: "Mensalidade" },
  modelagem: { duration: "1 mês e meio", price: "R$ 600,00", priceLabel: "Valor total do curso" },
  ajustes: {
    duration: "15 dias",
    price: "R$ 300,00",
    priceLabel: "Investimento (em até 2x)",
    period: "07/12 a 18/12",
    schedule: "Das 18h às 21h",
    spots: "Restam apenas 3 vagas",
    perMachine: "1 aluno por máquina",
  },
};

export const materiais = [
  {
    id: "ebook-corte-costura",
    name: "Ebook Corte e Costura do Zero",
    description:
      "Um guia digital para aprender corte e costura desde o início, no seu ritmo.",
    url: "https://pay.kiwify.com.br/tDF58eq",
  },
  {
    id: "guia-precificacao",
    name: "Guia de Precificação para Costureiras",
    description:
      "Aprenda a precificar seus serviços de costura de forma justa e profissional.",
    url: "https://pay.kiwify.com.br/9J86mah",
  },
] as const;
