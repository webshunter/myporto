import {ThListIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const skill = defineType({
  name: 'skills',
  title: 'Skill',
  type: 'document',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prosentase',
      title: 'Proficiency (%)',
      type: 'number',
      description: 'How proficient you are, from 0 to 100.',
      validation: (Rule) => Rule.required().min(0).max(100),
      initialValue: 80,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      prosentase: 'prosentase',
    },
    prepare({title, prosentase}) {
      return {
        title: title || 'Untitled Skill',
        subtitle: typeof prosentase === 'number' ? `${prosentase}% proficiency` : 'No proficiency set',
      }
    },
  },
})
