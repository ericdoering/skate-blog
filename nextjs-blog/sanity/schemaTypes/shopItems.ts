import { defineType, defineField } from "sanity";

export default defineType({
  name: "shopItem",
  title: "Shop Item",
  type: "document",

  initialValue: () => ({
    sku: Math.floor(100000 + Math.random() * 900000).toString(), 
  }),

  fields: [
    defineField({
      name: "name",
      title: "Item Name",
      type: "string",
      validation: (rule) => rule.required().min(2),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),

    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      validation: (rule) => rule.required().max(30),
    }),

    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "inventory",
      title: "Inventory Count",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
