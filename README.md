# Bilin Stone / Jianhui Home Website

Production domain: [jianhuihome.com](https://jianhuihome.com)

This is a Next.js App Router website for Bilin Stone / Jianhui Home, with public product pages, inquiry forms, admin product management, and Prisma-backed product/inquiry data.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build Checks

```bash
npm run lint
npm run build
```

## Railway Deployment

Railway can deploy this as a Node.js Next.js app using the existing scripts:

```bash
npm run build
npm run start
```

Required production variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `RESEND_API_KEY` if inquiry notification email should be sent

Optional:

- `NODE_ENV=production`
