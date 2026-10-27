export type ContactId = "tatiana" | "laura";
export type CourseId = "costura" | "modelagem";

export const contacts = [
  { id: "tatiana" as const, name: "Tatiana", phone: "(81) 99132-4803", wa: "5581991324803" },
  { id: "laura" as const, name: "Laura", phone: "(81) 98652-7779", wa: "5581986527779" },
];

export const courseNames: Record<CourseId, string> = {
  costura: "Corte e Costura",
  modelagem: "Modelagem",
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
  "Av. Visconde de Suassuna, 337, Santo Amaro, Loja 8 (Galeria Suassuna). Recife-PE.";
const q = "Av. Visconde de Suassuna, 337, Santo Amaro, Loja 8, Galeria Suassuna, Recife, PE";
export const mapsSearchUrl =
  "https://www.google.com/maps/search/?api=1&query=Av.%20Visconde%20de%20Suassuna%2C%20337%2C%20Santo%20Amaro%2C%20Loja%208%2C%20Galeria%20Suassuna%2C%20Recife%2C%20PE";
export const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const courses = {
  costura: { duration: "3 meses", price: "R$ 300,00", priceLabel: "Mensalidade" },
  modelagem: { duration: "1 mês e meio", price: "R$ 600,00", priceLabel: "Valor total do curso" },
};
