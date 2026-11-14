import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon} from '@sanity/icons'

/* Tipe objek tambahan, sepadan dengan blok di editor admin (repo block-editor) */
const divider = defineArrayMember({
  type: 'object',
  name: 'divider',
  title: 'Divider',
  fields: [
    {
      name: 'style',
      title: 'Gaya',
      type: 'string',
      options: {list: ['solid', 'dashed', 'dotted'], layout: 'radio'},
      initialValue: 'solid',
    },
  ],
  preview: {select: {style: 'style'}, prepare: ({style}) => ({title: `Divider (${style || 'solid'})`})},
})

const table = defineArrayMember({
  type: 'object',
  name: 'table',
  title: 'Table',
  fields: [
    {name: 'withHeader', title: 'Baris pertama sebagai header', type: 'boolean', initialValue: true},
    {
      name: 'rows',
      title: 'Baris',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [{name: 'cells', title: 'Sel', type: 'array', of: [{type: 'string'}]}],
        },
      ],
    },
  ],
  preview: {prepare: () => ({title: 'Table'})},
})

const cta = defineArrayMember({
  type: 'object',
  name: 'cta',
  title: 'Call to action',
  fields: [
    {name: 'title', title: 'Judul', type: 'string'},
    {name: 'text', title: 'Teks', type: 'text', rows: 2},
    {name: 'buttonText', title: 'Label tombol', type: 'string'},
    {name: 'buttonUrl', title: 'URL tombol', type: 'url'},
    {name: 'alignment', title: 'Perataan', type: 'string', options: {list: ['left', 'center', 'right']}},
  ],
  preview: {select: {title: 'title'}, prepare: ({title}) => ({title: title || 'Call to action'})},
})

const embed = defineArrayMember({
  type: 'object',
  name: 'embed',
  title: 'Embed',
  fields: [
    {name: 'service', title: 'Layanan', type: 'string'},
    {name: 'source', title: 'URL sumber', type: 'url'},
    {name: 'html', title: 'HTML embed', type: 'text', rows: 4},
    {name: 'caption', title: 'Keterangan', type: 'string'},
  ],
  preview: {select: {service: 'service', source: 'source'}, prepare: ({service, source}) => ({title: service || 'Embed', subtitle: source})},
})

const rawHtml = defineArrayMember({
  type: 'object',
  name: 'rawHtml',
  title: 'Raw HTML',
  fields: [{name: 'html', title: 'HTML', type: 'text', rows: 6}],
  preview: {prepare: () => ({title: 'Raw HTML'})},
})

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineArrayMember({
      type: 'code'
    }),
    divider,
    table,
    cta,
    embed,
    rawHtml,
  ],
})
