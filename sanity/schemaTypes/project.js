import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            options: {
                accept: '.png, .jpeg, .jpg, .webp'
            }
        }),
        defineField({
            name: 'name',
            title: 'Name service',
            type: 'string',
        }),
        defineField({
            name: 'details',
            title: 'Details Project', 
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
    preview: {
        select: {
            title: 'name',
        },
        prepare(selection) {
            return selection
        },
    },
})