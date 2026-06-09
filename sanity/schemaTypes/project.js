import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'content', title: 'Content'},
    {name: 'gallery', title: 'Gallery'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      group: 'overview',
      rows: 3,
      description: 'Shown on project cards and as the intro on the detail page.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'icon',
      title: 'Cover Image',
      type: 'image',
      group: 'overview',
      options: {
        accept: '.png, .jpeg, .jpg, .webp',
        hotspot: true,
      },
      description: 'Main thumbnail used in listings and the project detail header.',
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'blockContent',
      group: 'content',
      description: 'Detailed project write-up shown on the detail page.',
    }),
    defineField({
      name: 'gallery',
      title: 'Screenshot Gallery',
      type: 'array',
      group: 'gallery',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      options: {layout: 'grid'},
      description: 'Upload screenshots. Visitors can view them in a fullscreen gallery.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'icon',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled Project',
        subtitle: subtitle ? subtitle.slice(0, 60) + (subtitle.length > 60 ? '…' : '') : 'No description',
        media,
      }
    },
  },
})
