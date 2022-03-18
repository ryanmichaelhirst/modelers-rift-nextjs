import { Octokit } from 'octokit'

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
export const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GIT_ACCESS_TOKEN })

export const login = async () => {
  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated()

  return login
}

// should return http-status: 201 Created
export const createIssue = async ({
  title,
  body,
  labels,
}: {
  title: string
  body: string
  labels: string[]
}) => {
  if (!process.env.NEXT_PUBLIC_GIT_OWNER) throw Error('owner of repo is not defined')
  if (!process.env.NEXT_PUBLIC_GIT_REPO) throw Error('name of repo is not defined')

  return await octokit.rest.issues.create({
    owner: process.env.NEXT_PUBLIC_GIT_OWNER,
    repo: process.env.NEXT_PUBLIC_GIT_REPO,
    title: title,
    body: body,
    labels: labels,
    headers: {
      accept: 'application/vnd.github.v3+json',
    },
  })
}
