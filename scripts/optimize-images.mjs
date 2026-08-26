import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const raw = path.join(root, 'raw-assets')
const outDir = path.join(root, 'public', 'images')
const logoOut = path.join(root, 'public', 'logos')

fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(logoOut, { recursive: true })

const photos = [
  'PXL_20260825_231901102.jpg',
  'PXL_20260825_231907484.jpg',
  'PXL_20260825_231916589.jpg',
  'PXL_20260825_231933644.jpg',
  'PXL_20260825_231955849.jpg',
  'PXL_20260825_231957850.jpg',
  'PXL_20260825_232014956.jpg',
  'PXL_20260825_232644037.jpg',
]

const photoNames = [
  'counter',
  'shop-wide',
  'copiers',
  'workspace',
  'print-area',
  'equipment',
  'service-desk',
  'detail',
]

for (let i = 0; i < photos.length; i++) {
  const src = path.join(raw, photos[i])
  const name = photoNames[i]
  if (!fs.existsSync(src)) {
    console.warn('Missing', src)
    continue
  }
  await sharp(src)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, `${name}.webp`))
  await sharp(src)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(outDir, `${name}.jpg`))
  console.log('Optimized', name)
}

for (let i = 1; i <= 6; i++) {
  const src = path.join(raw, `logo${i}.jpg`)
  if (!fs.existsSync(src)) continue
  await sharp(src)
    .resize({ width: 512, height: 512, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(logoOut, `logo${i}.png`))
  await sharp(src)
    .resize({ width: 512, height: 512, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(path.join(logoOut, `logo${i}.webp`))
  console.log('Logo', i)
}

console.log('Done')
