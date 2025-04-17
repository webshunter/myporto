import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import { workexperience }  from './workexperience.js'

export const portofolioType = defineType({
  name: 'portofolio',
  title: 'Portofolio',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            preview: {
                select: {
                    imageUrl: 'asset.url',
                    title: 'caption'
                }
            }
        }),
        defineField({
            name: 'headtitle',
            title: 'Head Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),  
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),  
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),  
        defineField({
            name: 'github',
            title: 'Github',
            type: 'string',
        }),  
        defineField({
            name: 'linkcv',
            title: 'Link CV',
            type: 'string',
        }),  
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
        }),  
        defineField({
          name: 'experience',
          title: 'Work Experience',
          type: 'array',
          of: [
              {
                  type: 'reference',
                  to: [{ type: 'workexperience' }]
              }
          ]
        }),        
        defineField({
          name: 'education',
          title: 'Education',
          type: 'array',
          of: [
              {
                  type: 'reference',
                  to: [{ type: 'education' }]
              }
          ]
        }),        
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [
              {
                  type: 'reference',
                  to: [{ type: 'services' }]
              }
          ]
        }),        
        defineField({
          name: 'skills',
          title: 'Skill\'s',
          type: 'array',
          of: [
              {
                  type: 'reference',
                  to: [{ type: 'skills' }]
              }
          ]
        }),        
        defineField({
          name: 'project',
          title: 'Project\'s',
          type: 'array',
          of: [
              {
                  type: 'reference',
                  to: [{ type: 'project' }]
              }
          ]
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