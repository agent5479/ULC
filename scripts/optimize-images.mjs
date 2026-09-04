import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const imagesDir = path.join(root, 'public', 'images')
const logoDir = path.join(root, 'public', 'logos')

const PHOTO_EXT = /\.(jpe?g|png|webp)$/i
const TIMESTAMP_NAME = /^\d{8}[_-]?\d*/

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkFiles(full, acc)
    else acc.push(full)
  }
  return acc
}

function slugFor(filePath) {
  const rel = path.relative(imagesDir, filePath)
  const dir = path.dirname(rel)
  const parent = dir === '.' ? '' : slugify(dir)
  const base = slugify(path.parse(filePath).name)
  if (TIMESTAMP_NAME.test(path.parse(filePath).name) && parent) return parent
  if (parent && !base.startsWith(parent)) return `${parent}-${base}`
  return base
}

function rmdirEmpty(dir) {
  if (!fs.existsSync(dir) || dir === imagesDir) return
  const entries = fs.readdirSync(dir)
  if (entries.length === 0) {
    fs.rmdirSync(dir)
    rmdirEmpty(path.dirname(dir))
  }
}

fs.mkdirSync(imagesDir, { recursive: true })
fs.mkdirSync(logoDir, { recursive: true })

function isLogoFile(filePath) {
  return /ulc[\s_-]*logo/i.test(path.basename(filePath))
}

const photoFiles = walkFiles(imagesDir).filter((f) => PHOTO_EXT.test(f) && !isLogoFile(f))
/** @type {Map<string, { path: string, size: number }>} */
const sources = new Map()

for (const file of photoFiles) {
  const slug = slugFor(file)
  if (!slug) continue
  const size = fs.statSync(file).size
  const prev = sources.get(slug)
  if (!prev || size > prev.size) sources.set(slug, { path: file, size })
}

function fileKey(filePath) {
  return path.normalize(filePath).toLowerCase()
}

const keep = new Set()

for (const [slug, { path: src }] of sources) {
  const jpgOut = path.join(imagesDir, `${slug}.jpg`)
  const webpOut = path.join(imagesDir, `${slug}.webp`)
  const input = fs.readFileSync(src)
  const pipeline = () =>
    sharp(input)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })

  const webpBuf = await pipeline().webp({ quality: 78 }).toBuffer()
  const jpgBuf = await pipeline().jpeg({ quality: 82, mozjpeg: true }).toBuffer()
  fs.writeFileSync(webpOut, webpBuf)
  fs.writeFileSync(jpgOut, jpgBuf)
  keep.add(fileKey(webpOut))
  keep.add(fileKey(jpgOut))
  console.log('Optimized', slug)
}

for (const file of walkFiles(imagesDir).filter((f) => PHOTO_EXT.test(f) && !isLogoFile(f))) {
  if (!keep.has(fileKey(file))) {
    fs.unlinkSync(file)
    console.log('Removed', path.relative(imagesDir, file))
    rmdirEmpty(path.dirname(file))
  }
}

const logoCandidates = [...walkFiles(logoDir), ...walkFiles(imagesDir)].filter(
  (f) => PHOTO_EXT.test(f) && isLogoFile(f),
)
const logoSrc =
  logoCandidates.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size)[0] ??
  path.join(logoDir, 'ulc-logo.png')

if (!fs.existsSync(logoSrc)) {
  console.warn('Missing ULC logo in', logoDir)
} else {
  const pngOut = path.join(logoDir, 'ulc-logo.png')
  const webpOut = path.join(logoDir, 'ulc-logo.webp')
  const logoPipe = () =>
    sharp(logoSrc)
      .rotate()
      .resize({ height: 512, fit: 'inside', withoutEnlargement: true })

  const pngBuf = await logoPipe().png({ compressionLevel: 9 }).toBuffer()
  fs.writeFileSync(pngOut, pngBuf)
  const logoWebpBuf = await sharp(pngBuf).webp({ quality: 90 }).toBuffer()
  fs.writeFileSync(webpOut, logoWebpBuf)

  for (const file of [...walkFiles(logoDir), ...walkFiles(imagesDir)]) {
    if (!isLogoFile(file)) continue
    const base = path.basename(file)
    const inLogos = path.dirname(file) === logoDir
    if (inLogos && (base === 'ulc-logo.png' || base === 'ulc-logo.webp')) continue
    fs.unlinkSync(file)
    console.log('Removed', path.relative(root, file))
    rmdirEmpty(path.dirname(file))
  }
  console.log('Logo ulc-logo')
}

console.log('Done')
