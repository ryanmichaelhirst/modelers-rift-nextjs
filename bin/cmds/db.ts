import { logger } from '@/lib/logger'
import { prismaService } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { addAssets } from 'bin/jobs/add-assets'
import { addCharacters } from 'bin/jobs/add-characters'
import { uploadModels } from 'bin/jobs/upload-models'
import { uploadSounds } from 'bin/jobs/upload-sounds'
import { execSync } from 'child_process'

export const seedAws = async () => {
  // upload glb files
  await uploadModels('rift')
  // upload sfx and vo files
  await uploadSounds()
}

/**
 * Average runtime: 5:29.915 (m:ss.mmm)
 */
export const seedDb = async () => {
  // apply db migrations
  execSync(`npx prisma migrate dev`)
  logger.info('applied prisma migrations')

  // add dummy users
  const users = await prismaService.findManyUsers({ take: 100 })
  if (users.length === 0) {
    const usernames = ['test_user_1', 'test_user_2', 'test_user_3']
    const hashedPassword = await bcrypt.hash('password', 10)

    for (const username of usernames) {
      await prismaService.createUser({
        data: {
          name: username,
          email: `${username}@gmail.com`,
          password: hashedPassword,
        },
      })
    }

    logger.info('added test users')
  }

  // add characters
  const characters = await prismaService.findManyCharacters({ take: 100 })
  if (characters.length === 0) {
    await addCharacters()
    logger.info('added characters')
  }

  // add assets
  const assets = await prismaService.findManyAssets({ take: 100 })
  if (assets.length === 0) {
    await addAssets()
    logger.info('added assets')
  }
}
