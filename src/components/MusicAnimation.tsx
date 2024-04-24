import React from 'react'

const MusicAnimation = () => {
  return (
    <div className='mx-auto' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className='text-white'>Loading...</p>
    </div>

  )
}

export default MusicAnimation
