import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const skill = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
        defineField({
            name: 'name',
            title: 'Name skill',
            type: 'string',
        }),
        defineField({
            name: 'prosentase',
            title: 'Prosentase Skill',
            type: 'number',
            validation: Rule => Rule.min(0).max(100),
            options: {
                layout: 'slider',
                range: {min: 0, max: 100, step: 1},
                direction: 'horizontal'
            }
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