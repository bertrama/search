/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const fetch = require('node-fetch')

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}) => {
  const { createNode } = actions
  const data = await fetch('https://search.lib.umich.edu/spectrum')
    .then(response => response.json())

  createNode({
    id: createNodeId(`spectrum`),
    parent: null,
    children: [],
    internal: {
      type: 'spectrum',
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data)
    },
    data
  })

  // We're done. This lets Gatsby know.
  return
}

exports.onCreateNode = ({ node }) => {
  if (node.internal.type === 'spectrum') {
    
  }
}