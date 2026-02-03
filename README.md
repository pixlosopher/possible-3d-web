# POSSIBLE - AI-Powered 3D Printing

**Tomamos tu idea y le damos forma** / **Take your IDEAS seriously**

Modern web frontend for AI-powered 3D printing service. Built with Next.js 16 and Tailwind CSS.

## Features

- 🤖 **AI Model Generation** - Describe what you want, AI creates 3D models
- 🎨 **3D Preview** - Interactive Three.js model viewer
- 💳 **Secure Checkout** - Stripe & PayPal integration
- 📦 **Order Tracking** - Real-time order status updates
- 🇲🇽 **Bilingual** - Spanish/English support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **3D Viewer**: Three.js / React Three Fiber
- **Payments**: Stripe Checkout
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see print3d backend)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit .env.local with your values
# - NEXT_PUBLIC_API_URL: Your backend URL
# - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: Stripe test key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal client ID (optional) | `AY...` |

## Deploy to Vercel

### Option 1: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = Your deployed backend URL
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Your Stripe key
5. Click Deploy

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── create/            # AI generation flow
│   ├── pricing/           # Pricing page
│   ├── artists/           # Artist consulting page
│   ├── contact/           # Contact form
│   └── order/             # Order tracking
├── components/            # Reusable components
│   ├── Generator.tsx      # AI prompt input
│   ├── ModelPreview.tsx   # 3D viewer
│   └── PricingSelector.tsx # Size/material picker
└── lib/                   # Utilities
    └── api.ts             # Backend API client
```

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Cyan | `#04ACC8` | Primary buttons, accents |
| Green | `#9AC32E` | Secondary, artist section |
| Dark | `#0a0a0a` | Backgrounds |

## Contact

- **Website**: [possibleid.com](https://www.possibleid.com)
- **Email**: possibleidgdl@gmail.com
- **Location**: Guadalajara, Jalisco, México

## License

© 2026 Possible Ideas. All rights reserved.
