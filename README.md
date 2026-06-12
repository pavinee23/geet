# GE Energy Tech — Corporate Site

Standalone Next.js site for [GE Energy Tech](https://geet-neon.vercel.app) (8 languages, contact form, products).

Source synced from the main `web` monorepo `src/app/ge-energy-tech/`.

## Develop

```bash
npm install
cp .env.local.example .env.local   # add SMTP for contact form
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Connect this repo: [geserverhub/ge-energytech](https://github.com/geserverhub/ge-energytech)
2. Add environment variables from `.env.local.example` (SMTP_* and CONTACT_TO_EMAIL)
3. Optional: `NEXT_PUBLIC_PORTAL_BASE_URL` — base URL of your main app for Admin / Register / Sign-in links

## Contact form

`POST /api/contact` sends email via Gmail SMTP (or other provider in `lib/smtp-config.js`).
