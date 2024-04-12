import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
    value: string;
}

const Form = ({ value }: Props) => {
    const [sugg, setSugg] = useState([])
    const [suggDisplay, setSuggDisplay] = useState(false)

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
                setSuggDisplay(false);
            }
            if ((searchTerm.length == 1)||(searchTerm.length % 3 === 0 && searchTerm.length >= 3)) {
                const data = await fetch(`/api/suggestion?q=${searchTerm}`);
                const res = await data.json();
                if (res.data) {
                    setSuggDisplay(true);
                    setSugg(res.data);
                }
            } 
        }
        inputChanged();
    }, [searchTerm]);
    

    function clickedSuggestion(arg: string) {
        setSuggDisplay(false)
        router.push(`/main/${encodeURIComponent(arg)}`);
    }

    function closeDrop(){
        setSuggDisplay(false)
    }


    return (
        <div className="relative flex flex-col items-center justify-center px-5 md:px-0" onClick={closeDrop}>
            <form className="customForm  w-3/4 p-2 flex justify-center items-center space-x-2" onSubmit={searchSong}>
                <input
                    type="text"
                    className='bg-black w-full text-myGrey'
                    placeholder='Write the song name...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className='rounded-lg bg-myPurple text-white px-4 py-2 hover:bg-myPurple-hover transition-all duration-300'
                    type='submit'
                >
                    Search
                </button>
            </form>
            {suggDisplay ?
                <div className="absolute px-5 md:px-0 w-full" style={{ overflow: 'auto', top: '65px', left: 0 }} 
                >
                    <div className=" flex flex-col w-5/6 md:w-3/4 bg-white mx-0 px-0 me-5 mx-auto" >
                        {sugg.map((each, index) =>
                            <div key={index} className='text-black hover:bg-myGrey'  onClick={(e) => { e.stopPropagation(); clickedSuggestion(each); }}>
                                <p className='ps-3' style={{cursor:'pointer'}}>{each}</p>
                            </div>
                        )}
                    </div>
                </div>
                : ''}
        </div>
    );
};

export default React.memo(Form);
