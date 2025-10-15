import { client } from "../../lib/sanity";

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

export default async function BlogArticle({params}: {params: {slug: string}}) {
    const data = await getData(params.slug);

    console.log("DATA => ", data)
    return (
        <>
            <h1>{params.slug}</h1>
        </>
    )
}