import {defineType} from 'sanity'

export const code = defineType({
  name: 'code',
  title: 'Code',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'Python', value: 'python'},
          {title: 'Java', value: 'java'},
          {title: 'C++', value: 'cpp'},
          {title: 'C#', value: 'csharp'},
          {title: 'PHP', value: 'php'},
          {title: 'Ruby', value: 'ruby'},
          {title: 'Go', value: 'go'},
          {title: 'Rust', value: 'rust'},
          {title: 'Swift', value: 'swift'},
          {title: 'Kotlin', value: 'kotlin'},
          {title: 'SQL', value: 'sql'},
          {title: 'JSON', value: 'json'},
          {title: 'YAML', value: 'yaml'},
          {title: 'Markdown', value: 'markdown'},
          {title: 'Shell', value: 'shell'},
          {title: 'Plain Text', value: 'text'}
        ]
      }
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10
    },
    {
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional filename for the code block'
    }
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
      filename: 'filename'
    },
    prepare(selection) {
      const {language, code, filename} = selection
      const title = filename || language || 'Code'
      const subtitle = code ? code.substring(0, 50) + (code.length > 50 ? '...' : '') : 'No code'
      return {
        title,
        subtitle: `${language || 'text'} - ${subtitle}`
      }
    }
  }
}) 