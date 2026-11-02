# Stripe Checkout for Maison da Costura (TEST mode) - proposal

No files change until this plan is approved.

## Decisions to confirm first

1. **Which Stripe setup.** Lovable has a built-in Stripe payments option that needs no Stripe account or keys. You asked for your own connected Stripe account (bring your own key). That works too, but the key must be added through Lovable's secure secret form. Neither option can be turned on from this chat session: payments have to be enabled from the Lovable editor chat. You need to pick one.
2. **Prices change a saved rule.** The site rules say "no payments" and describe Corte e Costura as R$ 300,00 per month. Your message gives a R$ 900 total. Once you approve, I'll update the saved rules to say payments are allowed and that Corte e Costura is R$ 900 total or 3 × R$ 300. Modelagem stays at R$ 600 total.
3. **Installment cap.** Do you want up to 10 installments, or whatever maximum the card issuer offers? Stripe Checkout may not let us set the cap at exactly 10 (see below).

## Payment options shown to the customer (kept separate)

```text
Corte e Costura
  A) Pay in full: R$ 900, one card charge
  B) Card installments: R$ 900 split by the card issuer (parcelado), if Stripe confirms support (Step 0)
  C) Monthly plan: R$ 300/month, charged automatically 3 times, then ends (a subscription, not installments)
Modelagem
  A) Pay in full: R$ 600
  B) Card installments: R$ 600 parcelado, if supported
Pix: one-time payment only, offered only if the account is approved for Pix
```

Option C is never presented as "parcelamento". Monthly charges will not be used in place of real card installments.

## Step 0 - Check before promising anything (no code)

Things I have not confirmed yet. I'll check each against Stripe's current docs and your account in test mode:
- Can hosted Checkout offer card installments (parcelado) for a Brazilian account in BRL? Can it cap them at 10, or are installment counts set by the issuer and Stripe? Do installments carry interest or fees?
- Is Pix active on the account? (It depends on the account being approved. Pix is one-time only, and Brazilian accounts cannot use Pix Automático for recurring payments.)
- Can a subscription stop by itself after 3 monthly charges (a subscription schedule, or cancel after 3 paid invoices)?
- Will Radar's default rules run on Checkout payments with no extra plan? Radar for Fraud Teams costs extra and is optional.

If installments in Checkout are not supported, option B is dropped and I'll tell you before building.

## What gets built (after approval)

- **Course selection** on the site: each course card gets a "Pagar online" choice for A, B or C, plus a short summary step that asks for name, email and phone.
- **Hosted Stripe Checkout**: the customer is sent to Stripe's own page. Card details never pass through our site.
- **Success and cancel pages** in Portuguese.
- **Fulfillment by webhook**: Stripe tells the site when a payment succeeds, fails, or a monthly charge is paid. The site records this in the database (enrollment status, payment type, amount, installment count, number of monthly charges paid). The thank-you page alone never counts as proof of payment.
- **Admin view** (needs a login): a list of enrollments and their payment status for Tatiana and Laura. I can leave this out if you prefer.
- No Stripe Connect, since no one else receives payouts.

## To enable in the Stripe Dashboard (test mode)

- Payment methods: Cards, Pix (if eligible), card installments (if available for the account)
- Radar: confirm default rules are on. Optional: block high-risk payments, require 3D Secure when Stripe asks for it.
- Webhook endpoint pointing at the site, sending: checkout.session.completed, checkout.session.async_payment_succeeded/failed (Pix), invoice.paid, invoice.payment_failed, customer.subscription.deleted. The signing secret goes in through the secure form.
- Business details and statement name in BRL

## Technical details

- Server functions create Checkout Sessions with server-side prices only. The client sends course and option IDs, never amounts. Prices live in src/lib/site.ts.
- Option A and B use mode=payment with payment_method_options.card.installments (if Step 0 confirms it). Option C uses mode=subscription with a schedule that stops after 3 iterations.
- Webhook route under src/routes/api/public/stripe-webhook verifies the Stripe signature and is idempotent: events are stored by ID.
- New tables: enrollments and payment_events, with RLS turned on. Only the admin role can read them, and writes come from the webhook only.
- Tests: assert R$ 900, R$ 300 × 3 and R$ 600 amounts, the installment cap, and that the webhook rejects bad signatures.
- Keys are read with process.env inside handlers only and are never written to code or chat.

## Open questions

1. Built-in Stripe or your own Stripe account?
2. Should the cap be exactly 10 installments, or the issuer's maximum?
3. Should the monthly plan (C) be offered, and if so, when does the first charge happen: at signup or at the start of the class?
4. Do you want the admin view with a login?
