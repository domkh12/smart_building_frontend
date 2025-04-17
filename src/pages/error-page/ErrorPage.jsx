import React from 'react'

export default function ErrorPage() {
  return (
    <main className='flex flex-col items-center justify-center h-screen bg-blue-800'>
      <img src="/404/404-computer.svg" alt="404-computer" className='w-1/3 xl:w-auto' draggable="false" onContextMenu={(e) => e.preventDefault()} />
      <div className='flex flex-col items-center justify-center space-y-4'>
        <h2 className='text-2xl font-bold text-orange-400'>404 Page not found</h2>
        <h1 className='text-4xl font-bold text-white sm:text-center'>Whoops! That page doesn't exist.</h1>
      </div>
    </main>
  )
}
