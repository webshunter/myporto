import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {Rule} from 'sanity'

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
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'code' }
            ],
        }),
        defineField({
            name: 'details',
            title: 'Details Project', 
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
                slugify: input =>
                  input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .slice(0, 96),
            },
            validation: Rule => Rule.required(),
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