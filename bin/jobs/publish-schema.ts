import { exec } from 'child_process'
import { logger } from 'logger/index'

export const publishSchema = async () => {
  try {
    exec(
      `rover graph publish ${process.env.APOLLO_GRAPH_REF} --schema graphql/generated/schema.graphql`,
      (err, stdout, stderr) => {
        logger.info(stdout)
      },
    )
  } catch (err) {
    logger.info('Failed to publish schema to apollo')
  }
}
