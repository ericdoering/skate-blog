import { createClient } from "next-sanity";
import imageBuilderUrl from "@sanity/image-url";

export const client = createClient({
    apiVersion: '2023-05-03',
    dataset: 'production',
    projectId: 'xidypni3',
    useCdn: false,
})

const builder = imageBuilderUrl(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any){
    return builder.image(source);
}