import { client, urlFor } from "../../lib/sanity";
import { fullBlog } from "../../lib/interface";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getData(slug: string){
    const query = `
            *[_type == "blog" && slug.current == "${slug}"]{
            "currentSlug": slug.current,
            title,
            content,
            titleImage
        }[0]`;

        const data = await client.fetch(query)
        return data
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data: fullBlog = await getData(slug);

    return (
        <>
            <div className="mt-8">
                <h1>
                    <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">Eric Doering - blog</span>
                    <span className="mt-4 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
                </h1>
                <Image priority className="rounded-lg mt-8 mx-auto transform rotate-90 border" height={300} width={300} src={urlFor(data.titleImage).url()} alt="title-image" />
            </div>
            <div className="mt-16 prose prose-blue prose-xl">
                <PortableText value={data.content} />
            </div>
        </>
    )
}