const { writeFileSync } = require('fs')
const { resolve } = require('path')
const core = require('@actions/core')
const { Octokit } = require('@octokit/action')
const octokit = new Octokit()

start()

async function start () {
  try {
    core.setCommandEcho(true)
    const scopesWithComments = await octokit.graphql(
      `
      query scopesWithComments($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          issues(
            labels: ["Scope"]
            last: 100
          ) {
            edges {
              node {
                number
                comments(last: 100) {
                  edges {
                    node {
                      bodyText
                      createdAt
                      updatedAt
                      author {
                        avatarUrl(size: 100)
                        ... on User {
                          name
                          url
                        }
                      }
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

    const result = scopesWithComments.repository.issues.edges.map(sc => {
      return {
        issue_number: sc.node.number,
        percentage: getCurrentPercentage(sc.node.comments.edges.map(edge => edge.node.bodyText)),
        history: sc.node.comments.edges.reverse().map(edge => getHistoryPoint(edge.node)),
      }
    })

    writeFileSync(resolve(__dirname, '../../..', 'progress.json'), JSON.stringify(result, null, '  '))
  } catch (error) {
    core.setFailed(error.message)
  }
}

function getCurrentPercentage(comments) {
  const reversedComments = comments.reverse()
  let percentage
  let i = 0
  
  do {
    percentage = getPercentage(reversedComments[i])
    i++
  } while(percentage === null && i < reversedComments.length)

  return percentage === null ? 0 : percentage
}

function getPercentage(comment = '') {
  const matches = comment.match(/^\/progress[\s]+([\d]+)/)
  if (matches && matches.length === 2) {
    let result = Number(matches[1])
    if (Number.isNaN(result)) return null
    if (result < 0) return 0
    if (result > 100) return 100
    return result
  }
  return null
}

function getStatus(comment = '') {
  const matches = comment.match(/^\/progress[\s]+[\d\n]+(.+)/s)
  if (matches && matches.length === 2) return matches[1]
  return null
}

function getHistoryPoint(commentObject) {
  if (!commentObject.bodyText.match(/^\/progress[\s]+/)) return

  return {
    percentage: getPercentage(commentObject.bodyText),
    status: getStatus(commentObject.bodyText),
    createdAt: commentObject.createdAt,
    updatedAt: commentObject.updatedAt,
    author: commentObject.author,
  }
}