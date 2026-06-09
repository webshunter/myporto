import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {
  DEFAULT_SERVICE_ICON,
  getServiceIconLabel,
  SERVICE_ICON_LIST,
} from '../../lib/serviceIcons'

export const services = defineType({
  name: 'services',
  title: 'Service',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Font Awesome Icon',
      type: 'string',
      description: 'Pilih ikon untuk ditampilkan di homepage.',
      options: {
        list: SERVICE_ICON_LIST.map(({ value, title, hint }) => ({
          title: hint ? `${title} — ${hint}` : title,
          value,
        })),
        layout: 'dropdown',
      },
      initialValue: DEFAULT_SERVICE_ICON,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'skill',
      title: 'Skills / Technologies',
      type: 'text',
      rows: 3,
      description: 'List the tools or technologies used for this service.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'skill',
      icon: 'icon',
    },
    prepare({title, subtitle, icon}) {
      const iconLabel = getServiceIconLabel(icon)
      return {
        title: title || 'Untitled Service',
        subtitle: [iconLabel, subtitle ? subtitle.slice(0, 40) + (subtitle.length > 40 ? '…' : '') : null]
          .filter(Boolean)
          .join(' • '),
      }
    },
  },
})
