"use client"

import { Message, useChat } from 'ai/react'
import React from 'react'
import { IconButton } from "@i4o/catalystui"
import { PaperPlaneIcon } from '@radix-ui/react-icons'

export default function Chat() {
    const {messages, input, handleInputChange, handleSubmit, isLoading} = useChat()

    
    return (
        <div className='m-auto mt-4 flex max-w-md flex-col'>
            <form onSubmit={handleSubmit} className='flex gap-5 '>
                <input onChange={handleInputChange} value={input} type="text" placeholder="Entrez le nom d'un artiste" className='p-2 bg-transparent rounded-lg border border-gray-200 dark:border-gray-700 col-span-4'/>
                <IconButton className='text-blue-500' type='submit' icon={<PaperPlaneIcon />}/>
                {isLoading ? 
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Chargement...</span>
                    </div> : "" 
                }
            </form>
            <div className='flex flex-1 flex-col gap-2 text-start'>
                {messages.map((message: Message) => (
                    <div key={message.id}>
                        {message.role === "assistant" ?  message.content : ""}
                    </div>
                ))}
            </div>
        </div>
  )
}
