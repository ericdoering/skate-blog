import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '../../../lib/sanity'
import { token } from  '../../../lib/token'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})