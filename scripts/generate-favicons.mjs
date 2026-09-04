import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const root = path.resolve(import.meta.dirname, '..')
const src = path.join(root, 'public', 'icons', 'printer.svg')
const outDir = path.join(root, 'public')

if (!fs.existsSync(src)) {
  console.error('Missing', src)
  process.exit(1)
}

async function iconPng(size) {
  return sharp(src)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

const outputs = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
]

for (const { name, size } of outputs) {
  fs.writeFileSync(path.join(outDir, name), await iconPng(size))
  console.log('Wrote', name)
}

const icoBuf = await pngToIco([await iconPng(16), await iconPng(32), await iconPng(48)])
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
      id: 'https://unlimitedcopies.co.nz/',
      start_url: 'https://unlimitedcopies.co.nz/',
      scope: 'https://unlimitedcopies.co.nz/',
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
