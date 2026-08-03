# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SkyFi is a multi-locale eSIM e-commerce platform built with Next.js 15.5.7 (App Router + Turbopack), serving eSIM/SIM products. Three app variants coexist: the main web app, an HDBank embedded WebView app, and a Vikki embedded WebView app.

## Development Commands

```bash
yarn dev        # Dev server with Turbopack on http://localhost:3000
yarn build      # Production build
yarn start      # Start production server
yarn lint       # ESLint
```

No test framework is configured — QA is manual.

## Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL=https://bss-api.skyfi.network/api/bss
BASE_URL_SOCKET=https://bss-api.skyfi.network
JITSI_DOMAIN=https://meet.skyfi.network/
NEXT_PUBLIC_IS_DEV_TOOL=true   # enables eruda mobile console
```

Production uses `skyfi.pro` domain variants (commented out in `.env`).

## Architecture

### Three App Variants

All variants share services and components but have isolated route trees and brand styling:

| Variant | Route prefix | Source value | Payment method |
|---------|-------------|--------------|----------------|
| Main web | `/[locale]/checkout/` | `WEB` / `WEB_VJ` | Redirect to GalaxyPay |
| HDBank | `/[locale]/hdbank-app/` | `hdbank-app` | `postMessage` to React Native |
| Vikki | `/[locale]/app-vikki/` | `vikki-app` | `postMessage` to React Native |

The `source` field threads through all checkout service calls (order creation, coupon validation) so the backend can apply brand-specific discount rules.

Brand configuration lives in `src/app/utils/orderSourceContext.js` — add new variants there.

### WebView / React Native Communication

HDBank and Vikki terminate payment by posting a message instead of redirecting:

```javascript
window.ReactNativeWebView.postMessage(JSON.stringify({
  action: "payment",
  bill_id: orderNumber,
  bill_type: "online",
  url_callback: "https://skyfi.network/hdbank-app/checkout/result?orderId={code}"
}));
```

Check availability with `typeof window !== 'undefined' && window.ReactNativeWebView`. Both variants include a `/webview-test` route for interactive message debugging.

Orders with `total_amount === 0` skip payment and redirect directly to the result page.

### Checkout / Payment Flow

1. `PaymentPage.jsx` collects customer info via React Hook Form + Yup validation
2. Form state auto-saves to localStorage (1 s debounce) via `formStorageHelper.js` — excluding dynamic fields (`items`, `isFullEsim`, `discount_amount`, etc.)
3. Coupon pre-validated before order creation
4. Physical SIM (`sim_type === 'USIM'`) items trigger a shipping address form; eSIM-only orders skip it
5. `trackAddShippingInfo()` / `trackAddPaymentInfo()` fire before order creation (GA4)
6. Validation failure scrolls to the first error field with 100 px offset for fixed headers

### Internationalization

- **Library**: `next-intl` 4.x
- **Locales**: `vi` (default), `en`, `ko`, `zh-TW`, `zh-CN`, `ja`, `th`, `ru`
- **Config**: `src/i18n/routing.js`, `src/i18n/request.js`
- **Messages**: `src/messages/[locale]/index.json`
- Every page is locale-parameterized; use `useLocale()` and `useTranslations()`.

### State Management

**`src/app/stores/user.js`** — global context for:
- Auth (`isLoggedIn`, `setToken`, `logout`)
- Cart (`cartId`, `cartItems`, `addToCart`, `updateQuantity`, …)
- eSIM collection (`sims`, `simHome`)
- Persists `token` and `cartId` in localStorage; generates random cart IDs for guests

### API Layer

**`src/app/services/api/base.js`** — Axios instance that:
- Injects `Authorization: Bearer <token>` from localStorage
- Injects `lang` header from URL locale segment
- Normalizes responses: success → `{ success: true, data, … }`, error → `{ success: false, message, code, … }`
- All endpoints expect `code: 200` as the success indicator

### Styling

TailwindCSS 3 with custom tokens in `tailwind.config.js`:
- `primary`: `#FAA61A`, `secondary`: `#ED1B2F`, `background`: `#F7F7F7`
- Semantic scale: `success`, `warning`, `error`, `neutral` (50–900 shades)

HDBank override color: `#DA2128`. Vikki override color: `#D2008C`.

### Path Aliases

```javascript
import Foo from '@/app/components/Foo'; // resolves from src/
```

### Git Workflow

- Production: `master`
- Development: `develop`
- Feature branches cut from `develop`, merged to `develop` → `master`
