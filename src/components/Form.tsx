import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
    value: string;
}

const Form = ({ value }: Props) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(replaceSpaces(value));

    const searchSong = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        router.push(`/main/${encodeURIComponent(searchTerm)}`);
    };

    function replaceSpaces(inputString : string) :string{
        return inputString.replace(/%20/g, ' ');
    }

    return (
        <div className="mt-24 flex items-center justify-center">
            <form className="customForm w-3/4 p-2 flex items-center space-x-2" onSubmit={searchSong}>
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
        </div>
    );
};

export default React.memo(Form);
