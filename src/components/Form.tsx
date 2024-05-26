import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
    value: string;
    showSugg:any;
    setShowSugg:any;
}

const Form = ({ value, showSugg, setShowSugg  }:Props) => {
    const [sugg, setSugg] = useState([])
    const suggDisplay = showSugg;

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(replaceSpaces(value));

    const searchSong = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        router.push(`/main/${encodeURIComponent(searchTerm)}`);
    };

    function replaceSpaces(inputString: string): string {
        return inputString.replace(/%20/g, ' ');
    }


    useEffect(() => {
        async function inputChanged() {
            if(searchTerm.length == 0){
                setShowSugg(false);
            }
            if ((searchTerm.length == 1)||(searchTerm.length % 3 === 0 && searchTerm.length >= 3)) {
                const data = await fetch(`/api/suggestion?q=${searchTerm}`);
                const res = await data.json();
                if (res.data) {
                    setShowSugg(true);
                    setSugg(res.data);
                }
            } 
        }
        inputChanged();
    }, [searchTerm]);
    

    function clickedSuggestion(arg: string) {
        setShowSugg(false)
        router.push(`/main/${encodeURIComponent(arg)}`);
    }

    function closeDrop(){
        setShowSugg(false)
    }


    return (
        <div className="relative flex flex-col items-center justify-center px-5 md:px-0" onClick={closeDrop}>
            <form className="customForm w-8/10 md:w-3/4 p-2 flex justify-center items-center space-x-2" onSubmit={searchSong}>
                
                <div className='relative w-full'>
                <input
                    type="text"
                    className='bg-black w-full text-myGrey'
                    placeholder='Write the song name...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {suggDisplay ?
                <div className="absolute md:px-0 w-full" style={{ overflow: 'auto', top:'40px', left: '0'}} 
                >
                    <div className=" flex flex-col w-full md:w-3/4 px-1 bg-black dropz" >
                        {sugg.map((each, index) =>
                            <div key={index} className='bg-black text-white hover:bg-myGrey border-b-2 border-myGrey zIndex'  
                            onClick={(e) => { e.stopPropagation(); clickedSuggestion(each); }}>
                                <p className='ps-3' style={{cursor:'pointer'}}>{each}</p>
                            </div>
                        )}
                    </div>
                </div>
                : ''}

                </div>
                <button
                    className='rounded-lg bg-myPurple text-white px-4 py-2 hover:bg-myPurple-hover transition-all duration-300'
                    type='submit'
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default Form;
