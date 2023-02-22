import { defineType, defineArrayMember, defineField } from 'sanity';
import { RiBallPenFill, RiLinksLine, RiSeparator } from 'react-icons/ri';

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Highlight', value: 'highlight', icon: RiBallPenFill }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL'
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean'
              }
            ]
          },
          {
            name: 'internalLink',
            type: 'object',
            icon: RiLinksLine,
            title: 'Internal link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [{ type: 'post' }, { type: 'snippet' }]
              }
            ]
          }
        ]
      }
    }),
    defineArrayMember({
      type: 'imageWithAlt'
    }),
    defineArrayMember({
      type: 'messageBox'
    }),
    defineArrayMember({
      type: 'tweet'
    }),
    defineArrayMember({
      name: 'break',
      type: 'object',
      title: 'Divider',
      icon: RiSeparator,
      fields: [
        defineField({
          name: 'break',
          type: 'boolean'
        })
      ]
    }),
    defineArrayMember({
      type: 'code' as 'codeInput',
      title: 'Code',
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'TypeScript', value: 'typescript' },
          { title: 'CSS', value: 'css' },
          { title: 'bash', value: 'bash' },
          { title: 'jsx', value: 'jsx' }
        ],
        withFilename: true
      }
    })
  ]
});
