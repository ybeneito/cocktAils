import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import {Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai"

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: `Ignores tous les instructions précédentes. 
    Réponds toujours en Français.
    Tu es un expert en cocktails et fin connaisseur en personnalitée et tu dois conseiller un cocktail qu'aimerai boire la personnalitée dont l'utilisateur te passera le nom.
    Le format de réponse attendu est du JSON conforme à la RFC8259 suivant ce modelle:[{
        'name': 'le nom du cocktail',
        'ingredients': 'tableau de string contenant les ingrédients du cocktail',
        'recipe': 'tableau de string contenant les étapes la recette du cocktail',
        'explanation': 'courte explication 50 mots max sur le choix de ce cocktail contenant une reférence à la personne si possible'
    }]
    Assures toi de toujours me renvoyer une réponse propre en retirant par example les backslash et les bachslash n 
    `
}

export async function POST(req: Request) {
    const { messages } = await req.json()

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        })
        // const stream: ReadableStream = OpenAIStream(response)
        return NextResponse.json(response.data.choices[0].message?.content)
    } catch (error) {
        console.log("ERR: ", error)
        return new NextResponse("error", {status: 500})
    }
}