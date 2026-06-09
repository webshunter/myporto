import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const workexperience = defineType({
  name: 'workexperience',
  title: 'Work Experience',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Job Title / Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {dateFormat: 'MM-YYYY'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {dateFormat: 'MM-YYYY'},
      description: 'Leave empty if this is your current role.',
    }),
    defineField({
      name: 'details',
      title: 'Responsibilities & Achievements',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Bullet points or paragraphs about your work at this company.',
    }),
  ],
  preview: {
    select: {
      company: 'name',
      position: 'position',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({company, position, startDate, endDate}) {
      const period = [startDate, endDate || 'Present'].filter(Boolean).join(' – ')
      return {
        title: company || 'Untitled Company',
        subtitle: [position, period].filter(Boolean).join(' • '),
      }
    },
  },
})
