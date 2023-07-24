import Link from 'next/link'
import React from 'react'

export default function Home() {

  return (
    <div className='m-auto mt-4 flex max-w-md flex-col'>
      <Link href="/chat">CocktAIls</Link>   
    </div>
  )
}
