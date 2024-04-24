'use client'
import MusicPlayer from '@/app/play/MusicPlayer'
import MusicAnimation from '@/components/MusicAnimation'
import React, { useEffect, useState } from 'react'

const page = ({ params } : {params : any}) => {
    const [loading, setLoading] = useState(true)
    const [failuer,setFailure] = useState(false)
    const [audioURL, setAudioURL] = useState('')
    async function fetchPlaybackUrl() {
        const data = await fetch(`https://ymusic.cyclic.app/search/${params.id}`);
        console.log(data);
        const json = await data.json();
        if(json.status == 'success'){
            setAudioURL(json.audioURL)
                setLoading(false)
        }else{
            setFailure(true)
        }
    }
    useEffect(()=>{
        try {
            fetchPlaybackUrl()
        } catch (error) {
            setFailure(true)
        }
    },[])
    return (
        <div className='bg-black container mx-auto text-white'>
            {!loading ? 
            <div className=''>
                
                <MusicPlayer audioURL={audioURL}/>
            </div> :
                <div className='text-white'>
                    {failuer ? 'Video not available to play' : <MusicAnimation/>}
                </div>}
        </ div>
    )
}

export default page
