export default {
  name: 'app',
  title: 'Application',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'App Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Detailed Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          type: 'code'
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'categoryType'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isFree',
      title: 'Is Free App',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'appType',
      title: 'App Type',
      type: 'string',
      options: {
        list: [
          {title: 'Web Application', value: 'web'},
          {title: 'Mobile App (APK)', value: 'mobile'},
          {title: 'Desktop Application', value: 'desktop'},
          {title: 'Plugin/Extension', value: 'plugin'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'downloadUrl',
      title: 'Download URL (Google Drive/Dropbox)',
      type: 'url',
      description: 'Direct download link to the application file'
    },
    {
      name: 'fileSize',
      title: 'File Size (MB)',
      type: 'number',
      description: 'Size of the application file in MB'
    },
    {
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'Current version of the application'
    },
    {
      name: 'systemRequirements',
      title: 'System Requirements',
      type: 'text',
      description: 'Minimum system requirements to run the application'
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of key features'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Set to false to hide from store'
    },
    {
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      initialValue: 0,
      readOnly: true
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.min(0).max(5)
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'authorType'}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      price: 'price',
      isFree: 'isFree'
    },
    prepare(selection) {
      const {author, price, isFree} = selection
      return Object.assign({}, selection, {
        subtitle: isFree ? 'Free' : `$${price} - by ${author || 'Unknown'}`
      })
    }
  }
} 