import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const root = path.resolve(import.meta.dirname, '..')
const src = path.join(root, 'public', 'logos', 'logo1.png')
const outDir = path.join(root, 'public')

if (!fs.existsSync(src)) {
  console.error('Missing', src)
  process.exit(1)
}

const meta = await sharp(src).metadata()
const w = meta.width ?? 359
const h = meta.height ?? 306
/** Top mark (infinity) — clearer at tiny favicon sizes than full wordmark */
const markHeight = Math.round(h * 0.58)

async function fullLogoPng(size) {
  return sharp(src)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

async function markPng(size) {
  return sharp(src)
    .extract({ left: 0, top: 0, width: w, height: markHeight })
    .resize(size, size, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

const outputs = [
  { name: 'favicon-16x16.png', size: 16, mark: true },
  { name: 'favicon-32x32.png', size: 32, mark: true },
  { name: 'favicon-48x48.png', size: 48, mark: true },
  { name: 'apple-touch-icon.png', size: 180, mark: false },
  { name: 'android-chrome-192x192.png', size: 192, mark: false },
  { name: 'android-chrome-512x512.png', size: 512, mark: false },
]

for (const { name, size, mark } of outputs) {
  const buf = mark ? await markPng(size) : await fullLogoPng(size)
  fs.writeFileSync(path.join(outDir, name), buf)
  console.log('Wrote', name, mark ? '(mark)' : '(full)')
}

const icoBuf = await pngToIco([
  await markPng(16),
  await markPng(32),
  await markPng(48),
])
fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuf)
console.log('Wrote favicon.ico')

fs.writeFileSync(
  path.join(outDir, 'site.webmanifest'),
  `${JSON.stringify(
    {
      name: 'Unlimited Copies Takaka',
      short_name: 'ULC Takaka',
      description:
        'Commercial printer and postal pickup/drop-off in Takaka, Tasman.',
      start_url: '/ULC/',
      scope: '/ULC/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#c8102e',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
      ],
    },
    null,
    2,
  )}\n`,
)

console.log('Wrote site.webmanifest')
console.log('Done')
