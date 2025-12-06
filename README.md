# Layr.plus - Next.js 15 Production App

A modern, production-ready Next.js 15 application with Tailwind CSS v3, SEO optimization, and beautiful animations.

## Features

- ✅ Next.js 15 with App Router
- ✅ Tailwind CSS v3
- ✅ TypeScript
- ✅ SEO meta tags (Open Graph, Twitter Cards)
- ✅ Lucide icon favicon
- ✅ Framer Motion animations
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Optimized fonts (Manrope & Inter)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
layr-plus/
├── app/
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Home page
│   ├── globals.css     # Global styles and Tailwind
│   └── icon.tsx        # Lucide icon favicon
├── components/
│   ├── ThemeProvider.tsx
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── ValueProp.tsx
│   ├── StickyScroll.tsx
│   ├── BentoGrid.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── Cursor.tsx
│   └── MagneticButton.tsx
└── public/             # Static assets
```

## SEO Features

The app includes comprehensive SEO meta tags:
- Open Graph tags for social sharing
- Twitter Card support
- Proper canonical URLs
- Robot directives
- Structured metadata

## Technologies

- **Next.js 15** - React framework
- **Tailwind CSS v3** - Utility-first CSS
- **TypeScript** - Type safety
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## License

© 2024 Layr.plus Inc. All rights reserved.

