import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ApiKeyContext } from '../context/apiKeyContext';
import { Input, Button, Spinner } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';


const RevisionBuddy = () => {
    const { apiKey } = useContext(ApiKeyContext);
    const [file, setFile] = useState(null);
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('topic', topic);
        formData.append('api_key', apiKey);

        const response = await axios.post('http://127.0.0.1:5000/api/generateContent', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setAnswer(response.data);
        console.log(response.data);
        setIsLoading(false);
    };

    return (
        <div className=' bg-neutral-800 w-full h-full'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 text-white p-5 '>
            <input type="file" onChange={(event) => setFile(event.target.files[0])} required />
            <Input type="text" placeholder="Topic" onChange={(event) => setTopic(event.target.value)} required />
            <Button type="submit">Generate Content</Button>
            {isLoading ? <Spinner /> : <ReactMarkdown className=' text-white text-lg'>{answer}</ReactMarkdown>}
        </form>
        </div>
    );
};

export default RevisionBuddy;