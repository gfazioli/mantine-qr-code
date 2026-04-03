# Mantine QR Code Component

<img alt="Mantine QR Code" src="https://github.com/gfazioli/mantine-qr-code/blob/master/logo.jpeg" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-qr-code?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-qr-code)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-qr-code?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-qr-code)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-qr-code?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-qr-code)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-qr-code?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.
It requires **Mantine 9.x** and **React 19**.

The [Mantine QR Code](https://gfazioli.github.io/mantine-qr-code/) component is a highly customizable QR Code generator for React applications built with Mantine.

## Features

- 🎨 **Theme Integration**: Full Mantine theme support with all theme colors for foreground and background
- 📐 **Flexible Sizing**: Supports all Mantine sizes (xs–xl) plus custom values
- 🔵 **Dot Styles**: Three data module styles — `square`, `rounded`, `dots`
- 🔲 **Corner Styles**: Three finder pattern styles — `square`, `rounded`, `dots`
- 🖼️ **Image Overlay**: Add a logo or image at the center with automatic module excavation
- 🛡️ **Error Correction**: Four levels — L (7%), M (15%), Q (25%), H (30%)
- 📥 **Download Hook**: `useQRCodeDownload` hook to export as SVG, PNG, JPEG, or WebP
- 🎨 **Styles API**: Full Mantine Styles API with 8 style selectors (`root`, `svg`, `background`, `modules`, `finderPattern`, `finderOuter`, `finderInner`, `image`)
- 📦 **TypeScript**: Full type safety out of the box
- ⚡ **SSR Compatible**: Works with Next.js server-side rendering

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-qr-code/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)

## Installation

```sh
npm install @gfazioli/mantine-qr-code
```
or

```sh
yarn add @gfazioli/mantine-qr-code
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-qr-code/styles.css';
```

## Usage

```tsx
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return <QRCode value="https://mantine.dev" />;
}
```

### Custom styles

```tsx
<QRCode
  value="https://mantine.dev"
  size="xl"
  color="blue"
  dotStyle="rounded"
  cornerStyle="rounded"
/>
```

### Image overlay

```tsx
<QRCode
  value="https://mantine.dev"
  size="xl"
  image="https://example.com/logo.png"
  errorCorrectionLevel="H"
  imageRadius="md"
/>
```

### Download as SVG/PNG

```tsx
import { QRCode, useQRCodeDownload } from '@gfazioli/mantine-qr-code';

function Demo() {
  const { ref, download } = useQRCodeDownload({ fileName: 'my-qr-code' });

  return (
    <>
      <QRCode ref={ref} value="https://mantine.dev" />
      <button onClick={() => download({ format: 'png' })}>Download PNG</button>
      <button onClick={() => download({ format: 'svg' })}>Download SVG</button>
    </>
  );
}
```

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates
- Add new features, improve performance, and refine the developer experience
- Expand test coverage and documentation for smoother adoption
- Ensure long‑term sustainability without relying on ad hoc free time
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---

[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-qr-code&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-qr-code&Timeline)
