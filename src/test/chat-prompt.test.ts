import { describe, expect, it } from "vitest";
import { buildSystemPrompt } from "@/lib/chat.server";

describe("assistant system prompt", () => {
  const prompt = buildSystemPrompt();

  it("states the real course prices", () => {
    expect(prompt).toContain("R$ 300,00");
    expect(prompt).toContain("R$ 600,00");
  });

  it("states the real durations", () => {
    expect(prompt).toContain("3 meses");
    expect(prompt).toContain("1 mês e meio");
  });

  it("includes both WhatsApp contacts", () => {
    expect(prompt).toContain("(81) 99132-4803");
    expect(prompt).toContain("(81) 98652-7779");
  });

  it("includes the official address", () => {
    expect(prompt).toContain("Av. Visconde de Suassuna, 337, Santo Amaro. Recife-PE.");
  });

  it("forbids inventing schedules, dates, discounts and installments", () => {
    expect(prompt).toMatch(/[Nn]unca invente/);
    expect(prompt).toContain("horários");
    expect(prompt).toContain("parcelamentos");
  });
});
