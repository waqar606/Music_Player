'use client'

import React, { useEffect, useState } from 'react'
import Form from '@/components/Form'

const Main = ({ params }) => {
  const [dataG, setData] = useState();
  const [url, setUrl] = useState('');
  const [popup,setPopup] = useState(false);
  useEffect(() => {
    console.log('i fire once');
    const fetchResult = async () => {
      const data = await fetch(`/api/search?q=${params.search}`);
      const result = await data.json();
      setData(result);
      console.log(result);

    }
    fetchResult()
  }, [])

  useEffect(()=>{
    if(popup){
      document.body.style.overflowY = 'hidden';
      return () => {
        document.body.style.overflowY = 'auto';
      };
    }else{
      document.body.style.overflowY = 'auto';
    }
  },[popup])

  function downloadAudio(id){
    const url = `https://apidl.net/api/button/mp3?url=https://www.youtube.com/watch?v=${id}`;
    setUrl(url);
    setPopup(true)
  }
  return (
    <>
    <div className="">
      <Form value={params.search}/>
    </div>
    {popup ? 
    <div className='absolute z-2 overlay h-full w-full flex items-center justify-center' onClick={() => setPopup(false)}>
    <div class="overlayItem w-4/5 bg-white px-1">
      <p className='text-black mt-4 ms-3 me-3'>Choose any download option (192kpbs recommended)</p>
      <iframe src={url} frameborder="0" className=' w-full'
    sandbox="allow-forms allow-modals allow-pointer-lock  allow-same-origin allow-scripts allow-top-navigation allow-downloads"></iframe>
    </div>
    </div>
     :''} 

    <div className='container mt-8 px-16 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-md
    lg:gap-8
    '>
      {dataG ?
        dataG.map((element, index) => (
          <div key={index} className='card bg-newGrey flex flex-col justify-between p-4'>
            <div>
              <div className=''>
                {/* <img src={element.thumbnails[1].url} alt="" className='rounded-md w-full'/> */}
              </div>
              <div>
                <h1 className='text-white font-extrabold '>{element.name}</h1>
                <p className="text-myGrey">{element.artist.name}</p>
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <div>
                <button className='w-full p-3 border border-solid 
                    border-myPurple text-myPurple rounded font-bold hover:text-white hover:bg-myPurple'
                    onClick={()=>downloadAudio(element.videoId)}>Download</button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-white bg-black w-1/2 p-2 border border-solic 
                    rounded hover:border-black hover:bg-white hover:text-black">Play</button>
                <button className="text-white bg-black w-1/2 p-2 border border-solic 
                    rounded hover:border-black hover:bg-white hover:text-black">More</button>
              </div>
            </div>
          </div>
        ))
        :
        <div className='text-white'>loading</div>
      }
    </div>
    </>
  );

}

export default Main
