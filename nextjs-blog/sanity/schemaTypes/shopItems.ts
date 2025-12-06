import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'shopItem',
  title: 'Shop Item',
  type: 'document',

  initialValue: () => ({
    sku: Math.floor(100000 + Math.random() * 900000).toString(),
  }),

  fields: [
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: (rule) => rule.required().min(2),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),

    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (rule) => rule.required().max(30),
    }),

     defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'imageWithPrompt',
          title: 'Image with AI Prompt',
          type: 'object',
          fields: [
            defineField({
              name: 'prompt',
              title: 'AI Image Prompt',
              type: 'text',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                aiAssist: {
                  imageInstructionField: 'prompt',
                },
              },
            }),
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'inventory',
      title: 'Inventory Count',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
  ],
})
