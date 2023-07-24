import { OpenAIStream, StreamingTextResponse } from "ai";
import {Configuration, OpenAIApi } from "openai-edge"

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export const runtime = "edge"

export async function POST(req: Request) {
    const { messages } = await req.json()

    
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [{
            role: "system",
            content: `Ignores tous les instructions précédentes. 
            Tu es un expert en cocktails et fin connaisseur en personnalitée musicale et tu dois conseiller un cocktail qu'aimerai boire la star musicale dont l'utilisateur te passera le nom.
            Le format de réponse attendu est: le nom du cocktails, la liste des ingrédients, la recette et une courte explication 30 mots max pour ce choix. Ne rajoute pas d'introduction de réponse.
            Passes à la ligne entre chaques parties de la réponse et entre chaque ingrédients ou étapes de recette
            `,
        }, ...messages]
    })

    const stream: ReadableStream<any> = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}