import { describe, expect, it } from "vitest";
import { address, courses, mapsEmbedUrl, mapsRouteUrl, mapsSearchUrl, materiais, whatsappLink } from "@/lib/site";

describe("site info", () => {
  it("uses the updated street address without the shop or gallery", () => {
    expect(address).toBe("Av. Visconde de Suassuna, 337, Santo Amaro. Recife-PE.");
  });
  it("all map links point to the updated address", () => {
    const destination = "Av. Visconde de Suassuna, 337, Santo Amaro, Recife, PE";
    expect(new URL(mapsSearchUrl).searchParams.get("query")).toBe(destination);
    expect(new URL(mapsRouteUrl).searchParams.get("destination")).toBe(destination);
    expect(new URL(mapsEmbedUrl).searchParams.get("q")).toBe(destination);
  });
  it("Corte e Costura costs R$ 300,00 per month", () => {
    expect(courses.costura.price).toBe("R$ 300,00");
    expect(courses.costura.priceLabel).toBe("Mensalidade");
  });
  it("Modelagem costs R$ 600,00 total", () => {
    expect(courses.modelagem.price).toBe("R$ 600,00");
    expect(courses.modelagem.priceLabel).toBe("Valor total do curso");
  });
  it("Ajustes e Reformas costs R$ 300,00 in up to 2 installments, 07/12 to 18/12, 18h-21h, 3 spots left", () => {
    expect(courses.ajustes.price).toBe("R$ 300,00");
    expect(courses.ajustes.priceLabel).toContain("2x");
    expect(courses.ajustes.duration).toBe("15 dias");
    expect(courses.ajustes.period).toBe("07/12 a 18/12");
    expect(courses.ajustes.schedule).toBe("Das 18h às 21h");
    expect(courses.ajustes.spots).toContain("3 vagas");
  });
  it("digital products use the official Kiwify payment links", () => {
    const ebook = materiais.find((m) => m.id === "ebook-corte-costura")!;
    const guia = materiais.find((m) => m.id === "guia-precificacao")!;
    expect(ebook.url).toBe("https://pay.kiwify.com.br/tDF58eq");
    expect(guia.url).toBe("https://pay.kiwify.com.br/9J86mah");
  });
  it("WhatsApp links use the right numbers and course", () => {
    expect(whatsappLink("tatiana")).toContain("wa.me/5581991324803");
    expect(whatsappLink("laura", "modelagem")).toContain("wa.me/5581986527779");
    expect(decodeURIComponent(whatsappLink("laura", "modelagem"))).toContain("curso de Modelagem");
  });
});
