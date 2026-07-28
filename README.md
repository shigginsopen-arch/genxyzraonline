# GENXYZRA Cloudflare Website

A Cloudflare-native public website and GENI AI Business Advisor for **Genxyzra Next Generation Economic Development Corporation ("GENXYZRA")**.

## What is included

- Responsive, accessible single-page public website
- GENI chat interface
- Cloudflare Worker API at `/api/chat`
- Cloudflare Workers AI binding
- Static assets deployed with the Worker
- Mobile navigation, program, impact, FreshBridge NY, and contact sections
- Guardrails preventing GENI from claiming guarantees or requesting sensitive information

## Before launch

1. Replace the contact placeholder in `public/index.html` with GENXYZRA's public email and telephone number.
2. Confirm all organizational claims and impact figures.
3. Review the FreshBridge NY program description with qualified legal and tax counsel before publishing detailed liability or tax-benefit claims.
4. Add GENXYZRA's final logo, social links, privacy policy, terms, and accessibility/contact procedures.
5. Configure Cloudflare Rate Limiting for `/api/chat`.
6. Consider Turnstile before broad public promotion.

## Deploy from your computer

Install Node.js 20 or newer, then open a terminal in this folder:

```bash
npm install
npx wrangler login
npm run deploy
```

Wrangler will create/deploy the Worker and print a `workers.dev` address.

## Connect your Cloudflare domain

After the first deployment:

1. Open **Cloudflare Dashboard → Workers & Pages → genxyzra**.
2. Open **Settings → Domains & Routes**.
3. Choose **Add → Custom Domain**.
4. Enter your domain, such as `genxyzra.org`.
5. Cloudflare will create the required DNS record and certificate.

Because the domain is already registered and using Cloudflare DNS, no nameserver migration is needed.

## Deploy through GitHub instead

1. Create a private or public GitHub repository.
2. Upload this project.
3. In Cloudflare, choose **Workers & Pages → Create → Import a repository**.
4. Select the repository.
5. Use `npm run deploy` only for direct Wrangler deployments; Cloudflare's Git integration can detect the Worker configuration.
6. Confirm the Workers AI binding named `AI` exists after deployment.

## Local preview

```bash
npm install
npm run dev
```

The `remote: true` AI binding allows local development to call the remote Workers AI service through Wrangler authentication.

## Important limitations

GENI is an educational AI advisor, not a lawyer, accountant, tax professional, investment adviser, lender, or government contracting officer. It should not be used to make final regulated or high-stakes decisions.

The initial website does not include user accounts, permanent chat history, contact-form email delivery, donations, a database, or a content-management system. Those are appropriate future phases.
