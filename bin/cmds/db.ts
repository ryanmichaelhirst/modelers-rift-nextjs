import { prismaService } from '@lib/prisma'
import uploadAssets from 'bin/jobs/upload-assets'
import uploadCharacters from 'bin/jobs/upload-characters'
import { uploadModels } from 'bin/jobs/upload-models'
import { uploadSounds } from 'bin/jobs/upload-sounds'
import { execSync } from 'child_process'

export const seedAws = async () => {
  // upload glb files
  await uploadModels('rift')
  // upload sfx and vo files
  await uploadSounds()
}

export const seedDb = async () => {
  // apply db migrations
  execSync(`npx prisma migrate dev`)

  // import dummy users
  const users = await prismaService.findManyUsers({ take: 100 })
  if (users.length === 0) {
    const usernames = ['test_user_1', 'test_user_2', 'test_user_3']

    for (const username of usernames) {
      await prismaService.createUser({
        data: {
          name: username,
          email: `${username}@gmail.com`,
          password: 'password',
        },
      })
    }
  }

  await uploadCharacters()
  await uploadAssets()
}
