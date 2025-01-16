const Header = () => {

  return (
    <header className='w-full bg-zinc-800 px-[1rem] sm:px-[7.2rem] py-6 flex justify-between items-center max-sm:gap-2'>
        <h1 className='text-white font-bold text-3xl sm:text-4xl'>Crypto Tracker</h1>
          <div>
            <img src="/Crypto.webp" alt="" className='h-[5rem] rounded-full w-[5rem] object-cover'/>
          </div>
    </header>
  )
}

export default Header
