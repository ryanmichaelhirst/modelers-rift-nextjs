import { exec } from 'child_process'

export const publishSchema = () => {
  try {
    exec(
      `rover graph publish ${process.env.APOLLO_GRAPH_REF} --schema graphql/generated/schema.graphql`,
      (err, stdout, stderr) => {
        console.log(err, stdout, stderr)
      },
    )
  } catch (err) {
    console.log('Failed to publish schema to apollo', err)
  }
}
