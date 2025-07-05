import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faHeadset, faPlay, faCode, faTablet } from '@fortawesome/free-solid-svg-icons';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';

const Features = ({ setShowSugg }: { setShowSugg: any }) => {
    const dataG = [
        {
            icon: faHeadphones,
            title: 'MP3',
            para: 'Download audios of all your favourite YouTube videos in just seconds, with our easy togo simple processs',
        },
        {
            icon: faHeadset,
            title: 'MP4',
            para: 'Download vidoes of all your favourite YouTube videos in just seconds, with our easy togo simple processs',
        },
        {
            icon: faPlay,
            title: 'Play',
            para: 'Play audio of all your favourite YouTube videos in just seconds, with our easy togo simple processs',
        },
        {
            icon: faCode,
            title: 'API',
            para: 'You can get access to search API and download API to download your favuorite audio and get search results from yt',
        },
        {
            icon: faTablet,
            title: 'GUI',
            para: 'A seamless and easy to go GUI built with Tailwind CSS.',
        },
        {
            icon: faHtml5,
            title: 'Tech Stack',
            para: 'The entire application is built on top of NextJS, typescript version, with properly integrating client side with server code and ytdl-core',
        },
    ];

    return (
        <section onClick={() => { setShowSugg(false) }}>
            <div className='container mt-8 pb-24 px-16 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-md
    lg:gap-8
    '>

                {dataG.map((element, index) => (
                    <div key={index} className='card bg-newGrey flex flex-col justify-between p-4 border border-solid border-black hover:border-myPurple'>
                        <div>
                            <div>
                                <FontAwesomeIcon size='2x' icon={element.icon} style={{ color: "#7b0fff" }} />
                            </div>
                            <h1 className='text-white font-extrabold titleH1 mt-4'>{element.title}</h1>
                            <p className="text-myGrey">{element.para}</p>
                        </div>
                        <div>
                            <button className='mt-8 border border-solid border-white 
                hover:border-myPurple px-2 py-2 rounded
                transition-all duration-300 text-white'>
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features
