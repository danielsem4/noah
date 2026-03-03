import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, basename, extname } from 'path'

const ROOT = 'src/assets'
const OUT = 'src/assets/optimized'

async function convertDir(srcDir, outDir, maxWidth, quality) {
  const files = await readdir(srcDir)
  const images = files.filter(f => /\.(jpe?g|png)$/i.test(f))

  for (const file of images) {
    const name = basename(file, extname(file)) + '.webp'
    const input = join(srcDir, file)
    const output = join(outDir, name)

    const info = await sharp(input)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(output)

    console.log(`  ${file} → ${name}  (${(info.size / 1024).toFixed(0)} KB)`)
  }
}

async function convertDirMultiSize(srcDir, outDir, sizes, quality) {
  await mkdir(outDir, { recursive: true })
  const files = await readdir(srcDir)
  const images = files.filter(f => /\.(jpe?g|png)$/i.test(f))

  for (const file of images) {
    const stem = basename(file, extname(file))
    const input = join(srcDir, file)

    for (const width of sizes) {
      const name = `${stem}-${width}w.webp`
      const output = join(outDir, name)

      const info = await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toFile(output)

      console.log(`  ${file} → ${name}  (${(info.size / 1024).toFixed(0)} KB)`)
    }
  }
}

console.log('Optimizing carousel images (1200w + 600w, quality 75)...')
await convertDir(`${ROOT}/carousel`, `${OUT}/carousel`, 1200, 75)
await convertDirMultiSize(`${ROOT}/carousel`, `${OUT}/carousel`, [600], 75)

console.log('\nOptimizing food images (max 600px, quality 75)...')
await convertDir(`${ROOT}/carosuelFood`, `${OUT}/carosuelFood`, 600, 75)

console.log('\nOptimizing logo...')
await sharp(`${ROOT}/logo.jpeg`)
  .resize({ width: 320, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(`${OUT}/logo.webp`)
console.log('  logo.jpeg → logo.webp')

console.log('\nDone!')
