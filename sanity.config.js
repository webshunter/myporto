'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {SINGLETON_SCHEMA_TYPES} from './sanity/constants'

const singletonTypes = new Set(SINGLETON_SCHEMA_TYPES)

export default defineConfig({
  title: 'MyPorto CMS',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((template) => !singletonTypes.has(template.templateId))
      }
      return prev
    },
    actions: (prev, {schemaType}) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(
          ({action}) => action !== 'delete' && action !== 'duplicate'
        )
      }
      return prev
    },
  },
})
