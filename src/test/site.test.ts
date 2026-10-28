import { describe, expect, it } from "vitest";
import { address, courses, mapsEmbedUrl, mapsRouteUrl, mapsSearchUrl, whatsappLink } from "@/lib/site";

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
  it("WhatsApp links use the right numbers and course", () => {
    expect(whatsappLink("tatiana")).toContain("wa.me/5581991324803");
    expect(whatsappLink("laura", "modelagem")).toContain("wa.me/5581986527779");
    expect(decodeURIComponent(whatsappLink("laura", "modelagem"))).toContain("curso de Modelagem");
  });
});
