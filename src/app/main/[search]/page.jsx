'use client'

import React, { useEffect, useRef, useState } from 'react'
import Form from '@/components/Form'

const Main = ({ params }) => {
  const [dataG, setData] = useState();
  const [url, setUrl] = useState('');
  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [erro,setE] = useState(false)
  useEffect(() => {
    const fetchResult = async () => {
      //USING API (THAT USES YTMUSICAPI LIBRARY) BUILT WITHIN NEXTJS 
      // const data = await fetch(`/api/search?q=${params.search}`);
      // USING YMUSIC LIBRARY
      const data = await fetch(`https://ymusic.cyclic.app/search?name=${params.search}`);
      const result = await data.json();
      if(result.status=='success'){
        setData(result.data);
      }else if(result.status=='failed'){
        setE(true)
      }
    }
    fetchResult()
  }, [])

  useEffect(() => {
    if (popup) {
      document.body.style.overflowY = 'hidden';
      return () => {
        document.body.style.overflowY = 'auto';
      };
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [popup])

  function moreDownloadAudio(id, digit) {
    const url = [
      `https://www.yt2mp3s.me/api/widget?url=https://www.youtube.com/watch?v=${id}`,
      `https://apidl.net/api/widget?url=https://www.youtube.com/watch?v=${id}`,
  ];
    setUrl(url[digit]);
    setPopup(true);
    const p =document.createElement('p');
    p.classList.add(['text-black','mt-4' ,'ms-3', 'me-3']);
    p.innerText = 'Choose any download option (192kpbs recommended)';
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.className = 'w-full h-full';
    iframe.sandbox = 'allow-forms allow-modals allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-downloads';
    const overContain = document.getElementById('overlay');
    if(overContain){
      overContain.innerHTML='';
      overContain.append(p)
      overContain.append(iframe)
    }
    setTimeout(() => {
      console.log(iframe.contentWindow)
    }, 5000);
  }

  async function downloadAudio(id,title) {
    setPopup2(true);
    try {
      const response = await fetch(`/api/download?q=${id}`);
      if (!response.ok) {
        throw new Error('Failed to download audio');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log(error);
    }
    setPopup2(false);
  }
  

  return (
    <>
      {popup ?
        <div className='fixed z-2 overlay w-full h-full flex items-center justify-center' onClick={() => setPopup(false)}>
          <div className="overlayItem w-4/5 h-3/4 bg-white px-1" id='overlay'>
            <p className='text-black mt-4 ms-3 me-3'>Choose any download option (192kpbs recommended)</p>
            <iframe src={url} frameborder="0" className=' w-full h-full' 
              sandbox="allow-forms allow-modals allow-pointer-lock  allow-same-origin allow-scripts allow-top-navigation allow-downloads"></iframe>
          </div>
        </div>
        : ''}

      {popup2 ?
        <div className='fixed z-2 overlay w-full h-full flex items-center justify-center'>
          <div className="overlayItem w-4/5 h-2/3  bg-white p-6 flex items-center justify-center" id='overlay'>
            <h1 className='text-black text-center font-extrabold'>DOWNLOADING PLEASE WAIT</h1>
          </div>
        </div>
        : ''}
      <div className="pt-12">
        <Form value={params.search} />
      </div>

      {!erro ? <>
      <div className='container mt-8 px-16 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-md
    lg:gap-8
    '>
        {dataG ?
          dataG.map((element, index) => (
            <div key={element.videoId} className='card bg-newGrey flex flex-col justify-between p-4'>
              <div>
                <div className=''>
                  <img src={element.thumbnail} alt="Image Preview Unavailable" className='rounded-md w-full text-white' />
                </div>
                <div>
                    <h1 className='text-white font-extrabold titleH1'>{element.title}</h1>
                  <p className="text-myGrey">{element.channelTitle}</p>
                </div>
              </div>
              <div className='flex flex-col space-y-2'>
                <div>
                  <button className='w-full p-3 border border-solid 
                    border-myPurple text-myPurple rounded font-bold hover:text-white hover:bg-myPurple'
                    onClick={() => downloadAudio(element.videoId,element.title )}>Download</button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-white bg-black w-1/2 p-2 border border-solic 
                    rounded hover:border-black hover:bg-white hover:text-black">Play</button>
                  <button className="text-white bg-black w-1/2 p-2 border border-solic 
                    rounded hover:border-black hover:bg-white hover:text-black"
                    onClick={() => moreDownloadAudio(element.videoId, 0)}>More</button>
                </div>
              </div>
            </div>
          ))
          :
          <div className='text-white'>loading</div>
        }
      </div>
        </>
        : <div className='flex items-center justify-center text-white w-full mt-10'>Theres an issue with the app please try again later..</div>}
    </>
  );

}

export default Main
