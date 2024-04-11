import React from 'react'

const Headerz = () => {
  return (
    <nav>
        <div className="container mx-auto flex items-center justify-between py-3 px-10">
            <div>
                <h1 className='text-white font-extrabold'>MP3JUICEZ</h1>
            </div>
            <div className="flex items-center space-x-4 text-white">
                {/* <a href="" className='hover:text-myPurple transition-all duration-300'>Home</a> */}
                <a href="https://github.com/HuzaifaInshal/mp3juicez.git" target='_blank'
                className='border border-solid border-white 
                hover:border-myPurple hover:text-myPurple px-2 py-2 rounded
                transition-all duration-300'>Github</a>
            </div>
        </div>
    </nav>
  )
}

export default Headerz
