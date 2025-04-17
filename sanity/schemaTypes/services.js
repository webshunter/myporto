import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            options: {
                accept: '.svg'
            }
        }),
        defineField({
            name: 'name',
            title: 'Name service',
            type: 'string',
        }),
        defineField({
            name: 'skill',
            title: 'Skill',
            type: 'text',
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