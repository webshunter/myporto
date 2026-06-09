import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const portofolioType = defineType({
  name: 'portofolio',
  title: 'Homepage Profile',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'profile', title: 'Profile', default: true},
    {name: 'contact', title: 'Contact & Links'},
    {name: 'sections', title: 'Homepage Sections'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'profile',
      description: 'Displayed in the hero section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      group: 'profile',
      options: {hotspot: true},
      description: 'Main photo shown on the homepage.',
    }),
    defineField({
      name: 'headtitle',
      title: 'Headline / Job Title',
      type: 'string',
      group: 'profile',
      description: 'Short tagline under your name (e.g. Fullstack Developer).',
    }),
    defineField({
      name: 'description',
      title: 'Bio',
      type: 'text',
      group: 'profile',
      rows: 4,
      description: 'Short introduction about yourself.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'linkcv',
      title: 'Link CV',
      type: 'string',
      group: 'contact',
      description: 'Link to your downloadable CV.',
    }),
    defineField({
      name: 'language',
      title: 'Languages',
      type: 'string',
      group: 'contact',
      description: 'e.g. Indonesian, English',
    }),
    defineField({
      name: 'experience',
      title: 'Work Experience',
      type: 'array',
      group: 'sections',
      of: [{type: 'reference', to: [{type: 'workexperience'}]}],
      description: 'Manage entries under Homepage → Work Experience, then link them here.',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      group: 'sections',
      of: [{type: 'reference', to: [{type: 'education'}]}],
      description: 'Manage entries under Homepage → Education, then link them here.',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'sections',
      of: [{type: 'reference', to: [{type: 'services'}]}],
      description: 'Manage entries under Homepage → Services, then link them here.',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      group: 'sections',
      of: [{type: 'reference', to: [{type: 'skills'}]}],
      description: 'Manage entries under Homepage → Skills, then link them here.',
    }),
    defineField({
      name: 'project',
      title: 'Featured Projects (Homepage)',
      type: 'array',
      group: 'sections',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      description: 'Projects shown on the homepage. Full list is managed under Projects.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headtitle',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Homepage Profile',
        subtitle: subtitle || 'MyPorto homepage content',
        media,
      }
    },
  },
})
