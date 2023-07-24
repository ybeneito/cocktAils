import { NextRequest } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import {Configuration, OpenAIApi } from "openai-edge"
import { z } from "zod"

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

const bodyScheme = z.object({
    cocktails: z.array(z.string())
})

type Body = z.infer<typeof bodyScheme>

const prompt : (cocktails: string[]) => string = (cocktails: Body["cocktails"]) => `
Ignores toutes les instructions précédentes. Tu es un expert en cocktails et fin connaisseur en personnalitée musicale et tu dois me conseiller une liste de cocktails qu'aimerai boire la star musicale dont l'utilisateur te passera le nom.
Mes réponses: ${cocktails.map((cocktail: string) => `- ${cocktail}`).join("\n")}
Ne réponds que les nom des cocktails, sous forme de liste en sautant une ligne entre chaques nom. N'ajoutes pas de commentaires ou autre choses.
`

export const riuntime = "edge"

export async function POST(req: NextRequest) {

    const body = await req.json()
    const {cocktails}  = bodyScheme.parse(body)

    
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [{
            role: "system",
            content: prompt(cocktails),
        }]
    })

    const stream: ReadableStream<any> = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}