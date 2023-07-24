"use client"

import { Message, useChat } from 'ai/react'
import React from 'react'
import { Button, IconButton } from "@i4o/catalystui"
import { HomeIcon, PaperPlaneIcon } from '@radix-ui/react-icons'

export default function Chat() {
    const {messages, input, handleInputChange, handleSubmit} = useChat()


  return (
    <div className='m-auto mt-4 flex max-w-md flex-col'>
        <div className='flex flex-1 flex-col gap-2'>
            {messages.map((message: Message) => (
                <div key={message.id}>
                    {message.role === "user" ? "Demandé: " : "Réponse: "}
                    {message.content}
                </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} className='flex gap-5 '>
            <input onChange={handleInputChange} value={input} type="text" placeholder="Entrez le nom d'un artiste" className='p-2 bg-transparent rounded-lg border border-gray-200 dark:border-gray-700 col-span-4'/>
            <IconButton className='text-blue-500' type='submit' icon={<PaperPlaneIcon />}/>
        </form>
    </div>
  )
}
