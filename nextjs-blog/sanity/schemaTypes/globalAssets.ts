export default {
  name: 'globalAssets',
  title: 'Global Assets',
  type: 'document',
  fields: [
    {
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file'
    },
    {
      name: 'navbarLogo',
      title: 'Navbar Logo',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe this image for accessibility'
        }
      ]
    },
    {
      name: 'shopItems',
      title: 'Shop Items',
      description: 'Exactly 3 images displayed in the shop section',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Describe this image for accessibility'
            }
          ]
        }
      ],
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): { (): any; new(): any; error: { (arg0: string): any; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) =>
        Rule.required()
          .min(3)
          .max(3)
          .error('You must add exactly 3 shop images')
    }
  ]
}
