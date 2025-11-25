import { client } from "../app/lib/sanity";
import { getFile } from "@sanity/asset-utils";
import type { SanityProjectDetails } from "@sanity/asset-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fileUrl(source: { asset?: { _ref?: string } } | undefined) {
    if (!source?.asset?._ref) return undefined;
  
    const ref = source.asset._ref; // "file-c21c1b0776b28987f9e52c9fe151f928c00d6427-mov"
    const [_, id, ext] = ref.split("-");
  
    const projectId = "xidypni3"; // your Sanity projectId
    const dataset = "production";  // your dataset
  
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
  }