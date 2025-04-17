import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
        defineField({
            name: 'name',
            title: 'Company Name',
            type: 'string',
        }),
        defineField({
            name: 'startDate',
            title: 'Start From',
            type: 'date',
            options: {
                dateFormat: 'YYYY'
            }
        }),
        defineField({
            name: 'endDate',
            title: 'Finish at',
            type: 'date',
            options: {
                dateFormat: 'YYYY'
            }
        }),
        defineField({
            name: 'graduate',
            title: 'Type of Graduate',
            type: 'string',
            options: {
                list: [
                    {title: 'Major', value: 'major'},
                    {title: 'Academic Program', value: 'academic_program'},
                    {title: 'College', value: 'college'}
                ]
            }
        }),
        defineField({
            name: 'education',
            title: '',
            type: 'string',
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