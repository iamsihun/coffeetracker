# Coffee Tracker

A personal web app for tracking coffee beans and brew logs, accessible on desktop and mobile.

## Features

- Add coffee beans with name, roaster, origin, and notes
- Log brews per bean with grind size, grams in/out, brew time, brew method, and date
- View brew history per bean with auto-calculated brew ratio
- Edit or delete beans and individual brew logs

## Tech Stack

- **Next.js 14** — framework with server-side rendering and server actions
- **Prisma** — database ORM
- **PostgreSQL** (Neon) — hosted database
- **Tailwind CSS** — styling

## Local Development

```bash
npm install
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires a `DATABASE_URL` in `.env` pointing to a PostgreSQL database.
