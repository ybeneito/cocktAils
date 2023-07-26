import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import {Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai"

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

export const runtime = "edge"

const openai = new OpenAIApi(config)

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: `Ignores tous les instructions précédentes. 
    Réponds toujours en Français.
    Tu es un expert en cocktails et fin connaisseur en personnalitée et tu dois conseiller un cocktail qu'aimerai boire la personnalitée dont l'utilisateur te passera le nom.
    Le format de réponse attendu est du JSON conforme à la RFC8259 suivant ce modelle: {
        'personnalitée': 'nom de la personne demandée',
        'nom': 'le nom du cocktail',
        'ingredients': 'tableau de string contenant les ingrédients du cocktail',
        'recettes': 'tableau de string contenant les étapes la recette du cocktail',
        'explication': 'courte explication 50 mots max sur le choix de ce cocktail contenant une reférence à la personne si possible'
    }
    `
}

export async function POST(req: Request) {
    const { messages } = await req.json()

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
            temperature: 0.5
        })
        // const stream: ReadableStream = OpenAIStream(response)
        return new NextResponse(response.data.choices[0].message?.content, {status: 200})
    } catch (error) {
        console.log("ERR: ", error)
        return new NextResponse("error", {status: 500})
    }
}