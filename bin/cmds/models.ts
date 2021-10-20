import { exec, execSync } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

const queue = new PQueue({ concurrency: 30 })

export const generateGlb = async () => {
  const gltfDir = path.join(__dirname, '../../../../league_raw_models')
  const outDir = path.join(__dirname, '../../../../league_react_models')
  console.time('generate-glb')

  try {
    const champDirs = fs.readdirSync(gltfDir)

    for (const cdir of champDirs) {
      const skinDirs = fs.readdirSync(`${gltfDir}/${cdir}`)

      for (const sdir of skinDirs) {
        const files = fs.readdirSync(`${gltfDir}/${cdir}/${sdir}`)

        for (const f of files) {
          const filename = path.parse(f).name

          if (!f.includes('.gltf')) continue

          queue.add(() => {
            exec(
              `npx gltf-pipeline -i ${gltfDir}/${cdir}/${sdir}/${f} -o ${outDir}/${cdir}/${filename}.glb`,
              (err, stdout, stderr) => {
                console.log(
                  `gltf-pipeline -i ${gltfDir}/${cdir}/${sdir}/${f} -o ${outDir}/${cdir}/${filename}.glb`,
                )
                console.log(stdout)

                exec(
                  `npx gltfpack -i ${outDir}/${cdir}/${filename}.glb -o ${outDir}/${cdir}/${filename}.glb`,
                  (err, stdout, stderr) => {
                    console.log(`compressed glb for ${outDir}/${cdir}/${filename}.glb`)
                    console.log(stdout)
                  },
                )
              },
            )
          })
        }

        // pause when queue gets large
        if (queue.size >= 100) await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    // wait until queue empties before next champ dir
    await queue.onIdle()
  } catch (err) {
    throw new Error(`Could not read directory @ ${gltfDir}`)
  }

  console.timeEnd('generate-glb')
}

export const generateJsx = async () => {
  const glbDir = path.join(__dirname, '../../../../league_react_models')
  console.time('generate-jsx')

  try {
    const champDirs = fs.readdirSync(glbDir)

    for (const champDir of champDirs) {
      const files = fs.readdirSync(`${glbDir}/${champDir}`)

      if (!fs.existsSync(`client/src/components/models/${champDir}`)) {
        fs.mkdirSync(`client/src/components/models/${champDir}`)
      }

      for (const file of files) {
        const jsxFile = file.replace('glb', 'tsx')

        queue.add(async () => {
          await new Promise<void>((resolve) => {
            exec(`npx gltfjsx ${glbDir}/${champDir}/${file} -t`, async (err, stdout, stderr) => {
              console.log(`gltfjsx ${glbDir}/${champDir}/${file} -t > ${jsxFile}`)
              console.log(stdout)
              exec(
                `mv ${jsxFile} client/src/components/models/${champDir}/${jsxFile}`,
                async (err, stdout, stderr) => {
                  console.log(`mv ${jsxFile} client/src/components/models/${champDir}/${jsxFile} `)
                  resolve()
                },
              )
            })
          })
        })

        // pause when queue gets large
        if (queue.size >= 100) await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // wait until queue empties before next champ dir
      await queue.onIdle()
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${glbDir}`)
  }

  console.timeEnd('generate-jsx')
}

/**
 * @deprecated no longer in use, assets are now uploaded to s3. use --c -seed-aws instead
 */
export const copyAssets = async () => {
  const assetDir = path.join(__dirname, '../../../league_react_models')

  try {
    const champDirs = fs.readdirSync(assetDir)
    let counter = 0

    for (const champDir of champDirs) {
      if (counter >= 5) break
      const files = fs.readdirSync(`${assetDir}/${champDir}`)

      for (const file of files) {
        if (file.includes('.glb')) {
          if (!fs.existsSync(`client/src/assets/${champDir}`)) {
            fs.mkdirSync(`client/src/assets/${champDir}`)
          }

          execSync(`cp ${assetDir}/${champDir}/${file} client/src/assets/${champDir}/${file}`)
        }
      }
      counter++
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${assetDir}`)
  }
}
