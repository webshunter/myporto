import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'School / Institution',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'education',
      title: 'Degree / Major',
      type: 'string',
      description: 'e.g. Bachelor of Computer Science',
    }),
    defineField({
      name: 'graduate',
      title: 'Education Level',
      type: 'string',
      options: {
        list: [
          {title: 'Major', value: 'major'},
          {title: 'Academic Program', value: 'academic_program'},
          {title: 'College', value: 'college'},
        ],
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Year',
      type: 'date',
      options: {dateFormat: 'YYYY'},
    }),
    defineField({
      name: 'endDate',
      title: 'End Year',
      type: 'date',
      options: {dateFormat: 'YYYY'},
      description: 'Leave empty if still studying.',
    }),
  ],
  preview: {
    select: {
      school: 'name',
      degree: 'education',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({school, degree, startDate, endDate}) {
      const period = [startDate?.slice(0, 4), endDate?.slice(0, 4) || 'Present']
        .filter(Boolean)
        .join(' – ')
      return {
        title: school || 'Untitled School',
        subtitle: [degree, period].filter(Boolean).join(' • '),
      }
    },
  },
})
