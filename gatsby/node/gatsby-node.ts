import { GatsbyNode } from 'gatsby'
import { createPageSchemaCustomization } from './createSchemaCustomization'
import { createEventSchemaCustomization, sourceEventNodes, createEventPages, onCreateEventNode } from '../source/randOnt'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    }
  })
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async (...args) => {
  await Promise.all([
    // Events
    sourceEventNodes(...args),
  ])
}

export const createPages: GatsbyNode['createPages'] = async (...args) => {
  await Promise.all([
    // Calendar feeds
    createEventPages(...args),
  ])
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = (...args) => {
  // All pages
  createPageSchemaCustomization(...args)
  // Events
  createEventSchemaCustomization(...args)
}

export const onCreateNode: GatsbyNode['onCreateNode'] = (...args) => {
  // Events
  onCreateEventNode(...args)
}
