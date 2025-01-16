import React from 'react'

const Loading = () => {
  return (
    <div>
        <main className='h-lvh w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white place-items-center gap-[2rem] '>

<div className="w-full h-2 bg-gray-200 relative overflow-hidden rounded-md">
<div className="loading-bar absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-loading"></div>
</div>
</main>
    </div>
  )
}

export default Loading
