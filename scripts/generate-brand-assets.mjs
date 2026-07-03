import { readFileSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const brandDir = join(publicDir, 'brand')

async function svgToPng(input, output, width, height = width) {
  await mkdir(dirname(output), { recursive: true })
  const svg = readFileSync(input)
  const png = await sharp(svg, { density: 300 })
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  await writeFile(output, png)
}

async function main() {
  const mark = join(brandDir, 'logo-mark.svg')
  const logoLight = join(brandDir, 'logo-horizontal-light.svg')
  const logoDark = join(brandDir, 'logo-horizontal-dark.svg')

  await svgToPng(mark, join(publicDir, 'icon-light-32x32.png'), 32)
  await svgToPng(mark, join(publicDir, 'icon-dark-32x32.png'), 32)
  await svgToPng(mark, join(publicDir, 'apple-icon.png'), 180)
  await svgToPng(mark, join(brandDir, 'logo-mark.png'), 512)
  await svgToPng(logoLight, join(brandDir, 'logo-light.png'), 640, 96)
  await svgToPng(logoDark, join(brandDir, 'logo-dark.png'), 640, 96)
  await svgToPng(logoLight, join(publicDir, 'logo.png'), 640, 96)

  console.log('Brand assets generated in public/ and public/brand/')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
