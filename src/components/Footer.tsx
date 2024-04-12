import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <section>
        <div className='py-7'
        style={{backgroundColor:'rgb(255, 255, 255, 0.03)', borderTop:'solid 1px rgb(36, 36, 36)'}}>
        <div className="container mx-auto px-3">
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col md:w-1/2">
                    <p className="text-myGrey">© 2024 Huzaifa Inshal</p>
                    <h1 className='text-white font-extrabold'>MP3JUICEZ</h1>
                    <div className="flex">
                        <a className="" href='https://www.instagram.com/huzaifa_inshal/' target='_blank'><FontAwesomeIcon icon={faInstagram} style={{color: "white" }}/></a>
                        <a className="ms-3" target='_blank' href='https://www.linkedin.com/in/huzaifainshal/'><FontAwesomeIcon icon={faLinkedin} style={{color: "white" }}/></a>
                        <a className="ms-3" target='_blank' href='https://github.com/HuzaifaInshal'><FontAwesomeIcon icon={faGithub} style={{color: "white" }}/></a>
                    </div>
                </div>
                <div className="flex justify-between text-myGrey mt-5 md:w-1/2 md:mt-0 md:justify-between">
                    <div className="flex flex-col w-1/3">
                        <h2 className="text-white">Features</h2>
                        <p className="mt-3">Custom</p>
                        <p className="">MP3 Audio</p>
                        <p className="">MP4 Videos</p>
                        <p className="">GUI</p>
                        <p className="">API</p>
                        <p className="">Play</p>
                        <p className="">Tech Stack</p>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <h2 className="text-white">Company</h2>
                        <p className="mt-3">Community</p>
                        <p className="">Blog</p>
                        <p className="">FAQ</p>
                        <p className="">Status</p>
                        <p className="">Contact</p>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <h2 className="text-white">Legal</h2>
                        <p className="mt-3">Privacy Policy</p>
                        <p className="">Terms of Use</p>
                        <p className="">Security Policy</p>
                        <p className="">DPA</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
  )
}

export default Footer
