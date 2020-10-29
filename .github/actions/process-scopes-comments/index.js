const core = require('@actions/core')
const { Octokit } = require('@octokit/action')
const octokit = new Octokit()

async function start () {
  try {
    const { scopesWithComments } = await octokit.graphql(
      `
      query scopesWithComments($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          issues(
            labels: ["Scope"]
            last: 100
          ) {
            edges {
              node {
                title
                comments(last: 100) {
                  edges {
                    node {
                      bodyText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
      {
        owner: core.getInput('repo_owner'),
        repo: core.getInput('repo_name'),
      }
    )

    console.log(scopesWithComments)
  } catch (error) {
    core.setFailed(error.message)
  }
}

start()