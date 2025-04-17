import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const workexperience = defineType({
  name: 'workexperience',
  title: 'Work Experience',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
        defineField({
            name: 'name',
            title: 'Company Name',
            type: 'string',
        }),  
        defineField({
            name: 'position',
            title: 'Position',
            type: 'string',
        }),  
        defineField({
            name: 'startDate',
            title: 'Start From',
            type: 'date',
            options: {
                dateFormat: 'MM-YYYY'
            }
        }),
        defineField({
            name: 'endDate',
            title: 'Finish at',
            type: 'date',
            options: {
                dateFormat: 'MM-YYYY'
            }
        }),
        defineField({
            name: 'details',
            title: 'Details Work', 
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