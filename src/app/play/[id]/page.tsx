'use client'
import MusicPlayer from '@/app/play/MusicPlayer'
import MusicAnimation from '@/components/MusicAnimation'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const page = ({ params } : {params : any}) => {
    const [search1,setSearch1] = useState<String | null>(null)
    const [search2,setSearch2] = useState<String | null>(null)
    const searchParams = useSearchParams()
    useEffect(()=>{
        if(searchParams){
            setSearch1(searchParams.get('name'))
            setSearch2(searchParams.get('author'))
        }
    },[searchParams])
    
    const [loading, setLoading] = useState(true)
    const [failuer,setFailure] = useState(false)
    const [audioURL, setAudioURL] = useState('')
    async function fetchPlaybackUrl() {
        const data = await fetch(`https://ymusic.cyclic.app/search/${params.id}`);
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
            <div className='flex flex-col justify-between h-screen' style={{padding:'6% 0'}}>
                <div>
                    <p className='italic mx-10' >You are currently listening</p>
                <h1 className="text-white font-extrabold mx-10 mt-2 text-3xl">{search1}</h1>
                <p className="mt-5 italic mx-10">By</p>
                <p className="text-white mx-10 text-3xl">{search2}</p>
                </div>
                <MusicPlayer audioURL={audioURL}/>
            </div> :
                <div className='text-white'>
                    {failuer ? 'Video not available to play' : <MusicAnimation/>}
                </div>}
        </ div>
    )
}

export default page
