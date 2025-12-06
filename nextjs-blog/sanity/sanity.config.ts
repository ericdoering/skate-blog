import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { assist } from "@sanity/assist";

export default defineConfig({
  name: 'default',
  title: 'Skate Blog',

  projectId: 'xidypni3',
  dataset: 'production',

  plugins: [
    structureTool({
    structure: (S) =>
      S.list()
        .title('Content')
        .items([
          S.listItem()
            .title('Shop Items')
            .schemaType('shopItem')
            .child(S.documentTypeList('shopItem')),

          S.divider(),
          ...S.documentTypeListItems().filter(
            (item) => item.getId() !== 'shopItem'
          ),
        ]),
    }),
    visionTool(),
    assist(), 
  ],

  schema: {
    types: schemaTypes,
  },
})
